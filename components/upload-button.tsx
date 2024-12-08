'use client';

import { UploadButton as UploadThingButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

export default function UploadButton() {
  return (
    <UploadThingButton<OurFileRouter, any>
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        // Do something with the response
      }}
      onUploadError={(error: Error) => {
        console.error("Error: ", error);
      }}
    />
  );
} 