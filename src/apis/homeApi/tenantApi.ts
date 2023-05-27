import axios from 'axios';
import {BASEURL} from '../BASEURL';

export const GetContractsApi = (token:string) => {
  return new Promise((onfulfilled, onrejected) => {
    axios
      .get(`${BASEURL}/api-tenant/contracts`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        onfulfilled(res);
      })
      .catch(error => {
        onrejected(error);
      });
  });
};

export const GetContractDetailApi = (token:string, contractId:string) => {
  return new Promise((onfulfilled, onrejected) => {
    axios
      .get(`${BASEURL}/api-tenant/contracts/${contractId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        onfulfilled(res);
      })
      .catch(error => {
        onrejected(error);
      });
  });
};

export const GetInvoicesApi = (token:string) => {
  return new Promise((onfulfilled, onrejected) => {
    axios
      .get(`${BASEURL}/api-tenant/invoices`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        onfulfilled(res);
      })
      .catch(error => {
        onrejected(error);
      });
  });
};

export const GetInvoiceDetailApi = (token:string, invoiceId:string) => {
  return new Promise((onfulfilled, onrejected) => {
    axios
      .get(`${BASEURL}/api-tenant/invoices/${invoiceId}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        onfulfilled(res);
      })
      .catch(error => {
        onrejected(error);
      });
  });
};

export const GetTenantInvoicesPaymentinfoApi = (token:string, invoiceId:string) => {
  return new Promise((onfulfilled, onrejected) => {
    axios
      .get(`${BASEURL}/api-tenant/invoices/${invoiceId}/paymentinfo`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        onfulfilled(res);
      })
      .catch(error => {
        onrejected(error);
      });
  });
};
