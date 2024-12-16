import apiClient from "../auth/api-client";

export const updateConfig = async (key: string, value: any) => {
    try {
      const response = await apiClient.put(`/config-server/config?key=${encodeURIComponent(key)}`, value, {
        headers: { 'Content-Type': 'text/plain' },
      });
      console.log('Configuration updated:', response.data);
    } catch (error) {
      console.error('Error updating configuration:', error);
    }
  };
  
 export const getConfig = async (key: string): Promise<any> => {
    try {
      const response = await apiClient.get(`/config-server/config?key=${encodeURIComponent(key)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching configuration:', error);
      return null;
    }
  };

  export const getClientConfig = async (key: string): Promise<any> => {
    try {
      const response = await apiClient.get(`/config-server/config/client?key=${encodeURIComponent(key)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching configuration:', error);
      return null;
    }
  };