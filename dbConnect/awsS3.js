import { S3Client , GetObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials : {
        accessKeyId : process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_S3_SECRET_ACCESS_KEY
    }
})

export const putObjectURL = async (fileName , contentType, folderPath) => {
    const command = new PutObjectCommand({
        Bucket : "kisansamuh",
        Key : `${folderPath}${fileName}`,
        ContentType : contentType,
    })
    const url = await getSignedUrl(s3Client , command)
    return url
}

export const getObjectURL = async (key) => {
    const command = new GetObjectCommand({
        Bucket : "kisansamuh",
        Key : key,
    })
    const url = await getSignedUrl(s3Client,command)
    return url
}

// const init = async () => {
//     // console.log("URL is "+ await putObjectURL('nutrient.png' , "image/png"))
//     console.log("URL is " + await getObjectURL("roundupimage"))
// }



// init()
