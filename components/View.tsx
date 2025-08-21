import React from "react";
import Ping from "./ui/Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

import { after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  // update number of views
  after (async () => {
    await writeClient
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit();
  });

  // the above two requests run sequentially and are only shown on ui after they're completed
  // until then only skeleton is visible, hence to run "udpate views" in the background and immediately show current results we can use after

  // after allows you to schedule work to be executed after a response is finished. This is useful for tasks and other side effects that should not block the response.

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
