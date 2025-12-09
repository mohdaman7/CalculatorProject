export const pincodeService = {
  isPincode(value) {
    const str = String(value);
    return /^\d{6}$/.test(str);
  },

  async fetchAddress(pincode) {
    try {
      const response = await fetch(`/api/pincode/${pincode}`);
      
      if (!response.ok) {
        console.error('Pincode API error:', response.status);
        return null;
      }

      const data = await response.json();
      
      if (data.success) {
        return {
          taluk: data.taluk || '',
          district: data.district || '',
          state: data.state || ''
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching pincode address:', error);
      return null;
    }
  },

  formatAddress(address) {
    if (!address) return '';
    const parts = [address.taluk, address.district, address.state].filter(Boolean);
    return parts.join(', ');
  }
};
