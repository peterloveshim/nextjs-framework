import { redirect } from "next/navigation";

import appConfig from "@/configs/app.config";

const Page = () => {
  //redirect(appConfig.authenticatedEntryPath);
  redirect(appConfig.unAuthenticatedEntryPath);
};

export default Page;
