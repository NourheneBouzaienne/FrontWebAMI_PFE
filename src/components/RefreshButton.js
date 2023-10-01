import React from 'react';
import axios from 'axios';

const RefreshButton = () => {

    const handleRefresh = async () => {
        const datasetId = '4ad7faf3-ecc9-4c72-8b51-1d590d6db98d';
        const requestBody = {
            notifyOption: ""
        };

        //const url = https://api.powerbi.com/v1.0/myorg/datasets/${datasetId}/refreshes;

        /*  await axios.post(url, requestBody, {
             headers: {
                 Authorization: Bearer,
                 'Content-Type': 'application/json'
             }
         })
             .then(response => {
                 console.log('Refresh initiated successfully', response);
             })
             .catch(error => {
                 console.error('Error initiating refresh', error);
             }); */
    };

    return (
        <button onClick={handleRefresh}>
            Refresh Dataset
        </button>
    );
};

export default RefreshButton;
// https://login.microsoftonline.com/c37a0241-9820-4827-bd6a-6a776e4c228e/oauth2/v2.0/authorize?client_id=8ddbdc55-000d-4724-8495-bb9bf804c1ba
// &response_type=code
// &redirect_uri=http://localhost:8080/index
// &response_mode=query
// &scope=2ff814a6-3304-4ab8-85cb-cd0e6f879c1d%2F.default
// &state=<state></state>

// https://login.microsoftonline.com/c37a0241-9820-4827-bd6a-6a776e4c228e/oauth2/v2.0/authorize
//   ?client_id=8ddbdc55-000d-4724-8495-bb9bf804c1ba
//   &response_type=code
//   &redirect_uri=http%3A%2F%2Flocalhost%3A8080
//   &response_mode=query
//   &scope=2ff814a6-3304-4ab8-85cb-cd0e6f879c1d%2F.default
//   &state=3