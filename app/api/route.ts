import { NextResponse } from "next/server";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);

/**single file store */

// export async function POST(req: { formData: () => any }, res: any) {
//   try {
//     const formData = await req.formData();
//     const file = formData.getAll("files")[0];
//     console.log({ file });
//     const filePath = `./public/file/${file.name + Math.random()}`;
//     await pump(file.stream(), fs.createWriteStream(filePath));
//     return NextResponse.json({ status: "success", data: file.size });
//   } catch (e) {
//     return NextResponse.json({ status: "fail", data: e });
//   }
// }

/**mulitple file store */
export async function POST(req: { formData: () => any }, res: any) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");

    const responseData = [];

    for (const file of files) {
      console.log({ file });
      const filePath = `./public/file/${Math.random() + file.name}`;
      const responseFilePath = filePath.replace('./public', '');

      await pump(file.stream(), fs.createWriteStream(filePath));

      responseData.push({
        filename: responseFilePath,
        size: file.size,
      });
    }

    return NextResponse.json({ status: "success", data: responseData });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}

// export async function POST(req: { formData: () => any }, res: any) {
//   try {
//     const formData = await req.formData();
//     const files = formData.getAll("files");

//     const responseData = [];

//     for (const file of files) {
//       console.log({ file });
//       const filePath = `./public/file/${Math.random() + file.name}`;

//       await pump(file.stream(), fs.createWriteStream(filePath));

//       responseData.push({
//         filename: file.name,
//         size: file.size,
//       });
//     }

//     return NextResponse.json({ status: "success", data: responseData });
//   } catch (e) {
//     return NextResponse.json({ status: "fail", data: e });
//   }
// }
