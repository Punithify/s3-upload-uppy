import React, { useState, useRef } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import AwsS3 from "@uppy/aws-s3";
import Code from "./Code";

const uppy = new Uppy({
  meta: { type: "avatar" },
  restrictions: { maxNumberOfFiles: 1 },
  autoProceed: true,
  proudlyDisplayPoweredByUppy: true,
});

uppy.use(AwsS3, {
  getUploadParameters(file) {
    return fetch("/api/upload", {
      method: "post",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
      }),
    })
      .then((response) => {
        // Parse the JSON response.
        return response.json();
      })
      .then((data) => {
        return {
          method: data.method,
          url: data.url,
          fields: data.fields,

          headers: {
            "Content-Type": file.type,
          },
        };
      });
  },
});

const Fileupload = ({ title }) => {
  const [link, setLink] = useState(null);
  uppy.on("complete", (result) => {
    const url = result.successful[0].uploadURL;
    setLink(url);
  });
  return (
    <>
      <h1 className="mt-2 underline text-2xl text-bold text-center">{title}</h1>
      <div className="ml-20 mt-10">
        <Dashboard
          proudlyDisplayPoweredByUppy={true}
          uppy={uppy}
          theme="dark"
          proudlyDisplayPoweredByUppy={false}
          width={500}
          height={450}
          showProgressDetails={true}
          locale={{
            strings: {
              dropHereOr: "Drop here or %{browse}",
              browse: "browse",
            },
          }}
        />
      </div>

      {link ? (
        <div className="mt-6 ml-20">
          <Code code={link} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Fileupload;
