import * as xlsx from "xlsx";
import * as AWS from "aws-sdk";

export class ExcelService {
    public async readExcelFromS3(bucketName: string, s3Key: string) : Promise<unknown[]> {
        let buffer = await this.readExcelFromS3Internal(bucketName, s3Key);
        const workbook = xlsx.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);
        return data;
    }

    private async readExcelFromS3Internal(bucketName: string, s3Key: string) : Promise<Buffer> {
        const s3 = new AWS.S3();
        const params = {
            Bucket: bucketName,
            Key: s3Key
        };
        const { Body } = await s3.getObject(params).promise();
        return Body as Buffer;
    } 
}
