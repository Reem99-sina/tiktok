import { S3 } from 'aws-sdk'
import { View, Text } from 'react-native'
export  const s3Config=new S3({
    accessKeyId:"AKIAWIZSUXV47M52B64A",
    secretAccessKey:"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",
    region:"us-east-1"
})