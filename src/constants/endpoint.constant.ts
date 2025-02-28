export const DEFAULT_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
};

const getPaths = (basePath?: string) => {
  const newBasePath = basePath ?? "";
  return {
    v1: {
      auth: {
        root: `${newBasePath}/api/v1/admin/auth/`,
        token: `${newBasePath}/api/v1/admin/auth/token`,
        password: `${newBasePath}/api/v1/admin/auth/password`,
      },
      sites: {
        root: `${newBasePath}/api/v1/admin/sites/`,
        status: `${newBasePath}/api/v1/admin/sites/_status`,
      },
      units: {
        root: `${newBasePath}/api/v1/admin/units/`,
        status: `${newBasePath}/api/v1/admin/units/_status`,
        new: (id: string) => `${newBasePath}/api/v1/admin/sites/${id}/units/`,
        options: `${newBasePath}/api/v1/admin/units/options/`,
      },
      images: {
        root: `${newBasePath}/api/v1/admin/images/`,
      },
      file: {
        root: `${newBasePath}/api/file`,
      },
      contracts: {
        root: `${newBasePath}/api/v1/admin/contracts/`,
        calendar: `${newBasePath}/api/v1/admin/contracts/_calendar`,
        send: (id: string) =>
          `${newBasePath}/api/v1/admin/contracts/${id}/_send`,
      },
      checkout: {
        root: `${newBasePath}/api/v1/admin/checkout/`,
      },
      coupon: {
        root: `${newBasePath}/api/v1/admin/config/redeem/`,
        list: `${newBasePath}/api/v1/admin/config/redeem`,
      },
      currency: {
        root: `${newBasePath}/api/v1/admin/config/currency/`,
      },
    },
  };
};

/*
    {
      client: {
        v1: {
          ...
        }
      },
      server: {
        v1: {
          ...
        }
      }
    } 
    */
const ENDPOINT_INFOS = {
  client: process.env.BASE_PATH || "",
  server: process.env.API_URL || "",
};

export const endpoints: Record<string, any> = Object.fromEntries(
  Object.entries(ENDPOINT_INFOS).map(([key, val]) => [key, getPaths(val)])
);
