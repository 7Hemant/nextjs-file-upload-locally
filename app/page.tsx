"use client";
// import axios from "axios";
// import React, { useState } from "react";
// export default function Home() {
//   const [selectedFile, setSelectedFile] = useState<File>();
//   const [selectedImage, setSelectedImage] = useState<string>();
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     try {
//       var formdata = new FormData();
//       formdata.append("files", selectedFile);

//       var requestOptions = { method: "POST", body: formdata };

//       const response = await fetch("/api/", requestOptions);
//       const result = await response.text();
//       console.log(result);
//     } catch (error: any) {
//       console.log(error.response?.data);
//     }
//   };
//   return (
//     <form>
//       <div>
//         <label htmlFor="productImage" className="font-semibold text-[.9rem]">
//           Product Image
//           <div className="flex gap-1">
//             {selectedImage && (
//               <div className="w-40 aspect-video rounded-md flex items-center justify-center border-2  cursor-pointer">
//                 <img src={selectedImage} alt="" className="rounded-md" />
//               </div>
//             )}
//             <input
//               type="file"
//               name="productImage"
//               id="productImage"
//               hidden
//               onChange={({ target }) => {
//                 if (target.files) {
//                   const file = target.files[0];
//                   setSelectedImage(URL.createObjectURL(file));
//                   setSelectedFile(file);
//                 }
//               }}
//               multiple
//             />
//             <div className="w-40 aspect-video rounded-md flex items-center justify-center border-2 border-dashed cursor-pointer">
//               <span>Select Image</span>
//             </div>
//           </div>
//         </label>
//       </div>
//       <button
//         type="submit"
//         className="bg-[#5A55D2] text-white rounded-md  text-[13px] font-semibold py-4 px-8"
//         onClick={handleSubmit}
//       >
//         Create Product
//       </button>
//     </form>
//   );
// }
import React, { useState } from "react";

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      var formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      var requestOptions = {
        method: "POST",
        body: formData,
      };

      const response = await fetch("/api/", requestOptions);
      const result = await response.text();
      console.log(result);
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const imagesArray = filesArray.map((file) => URL.createObjectURL(file));
      setSelectedImages([...selectedImages, ...imagesArray]);
      setSelectedFiles([...selectedFiles, ...filesArray]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="productImage" className="font-semibold text-[.9rem]">
          Product Images
          <div className="flex flex-wrap gap-1">
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className="w-40 aspect-video rounded-md flex items-center justify-center border-2  cursor-pointer"
              >
                <img src={image} alt="" className="rounded-md" />
              </div>
            ))}
            <input
              type="file"
              name="productImage"
              id="productImage"
              hidden
              onChange={handleFileChange}
              multiple
            />
            <label
              htmlFor="productImage"
              className="w-40 aspect-video rounded-md flex items-center justify-center border-2 border-dashed cursor-pointer"
            >
              <span>Select Images</span>
            </label>
          </div>
        </label>
      </div>
      <button
        type="submit"
        className="bg-[#5A55D2] text-white rounded-md text-[13px] font-semibold py-4 px-8 mt-4"
      >
        Create Product
      </button>
    </form>
  );
}
