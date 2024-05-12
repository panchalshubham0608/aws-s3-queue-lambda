import { SQSEvent } from "aws-lambda";
import { ExcelService } from "../service/ExcelService";

const service = new ExcelService();
export const handler = async (event: SQSEvent) => {
    try {
        for (const record of event.Records) {
            const body = JSON.parse(record.body);
            const bucketName = body.Records[0].s3.bucket.name;
            const s3Key = body.Records[0].s3.object.key;
            const data = await service.readExcelFromS3(bucketName, s3Key);
            console.log(data);
        }
        return { statusCode: 200, body: "Success" };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: "Internal Server Error" };    
    }
}
