const cloudinary = require("cloudinary").v2;

// Configure Cloudinary (inline credentials for onboarding)
cloudinary.config({
  cloud_name: "dbwfsmjol",
  api_key: "433537731286139",
  api_secret: "NSBy7gVnycuw1fcl9SoJS6sTKzU",
});

const DEMO_IMAGE_URL =
  "https://res.cloudinary.com/demo/image/upload/sample.jpg";

async function main() {
  // 1. Upload an image from Cloudinary's demo domain
  console.log("Uploading sample image...\n");
  const uploadResult = await cloudinary.uploader.upload(DEMO_IMAGE_URL);

  console.log("Secure URL:", uploadResult.secure_url);
  console.log("Public ID:", uploadResult.public_id);

  // 2. Fetch image metadata
  console.log("\nFetching image details...\n");
  const details = await cloudinary.api.resource(uploadResult.public_id);

  console.log("Width:", details.width);
  console.log("Height:", details.height);
  console.log("Format:", details.format);
  console.log("Bytes:", details.bytes);

  // 3. Transform: f_auto picks the best format for the browser (e.g. WebP/AVIF)
  //    q_auto adjusts compression quality automatically for optimal size vs. quality
  const transformedUrl = cloudinary.url(uploadResult.public_id, {
    fetch_format: "auto",
    quality: "auto",
    secure: true,
  });

  console.log(
    "\nDone! Click link below to see optimized version of the image. Check the size and the format.",
  );
  console.log(transformedUrl);
}

main().catch((err) => {
  console.error("Error:", err.message || err);
  process.exit(1);
});
