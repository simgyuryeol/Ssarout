package com.ssafy.ssaout.common.utils;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class AmazonS3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String upload(MultipartFile multipartFile, String dir) throws IOException {
        File file = convert(multipartFile).orElseThrow(
            () -> new IllegalArgumentException("converting from MultipartFile to File failed."));
        return upload(file, dir);
    }

    private String upload(File file, String dir) {
        Optional<String> extension = getExtensionByStringHandling(
            file.getName());
        String fileName = dir + "/" + UUID.randomUUID();
        if (extension.isPresent()) {
            fileName += extension.get();
        } else {
            fileName += ".mp3";
        }
        String uploadFileUrl = putS3(file, fileName);
        removeLocalFile(file);
        return uploadFileUrl;
    }

    private String putS3(File file, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, file));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    private Optional<File> convert(MultipartFile multipartFile) throws IOException {
        Optional<String> extension = getExtensionByStringHandling(
            multipartFile.getName());
        String fileName = String.valueOf(UUID.randomUUID());
        if (extension.isPresent()) {
            fileName += extension.get();
        } else {
            fileName += ".mp3";
        }
        File convertFile = new File(System.getProperty("user.dir") + "/" + fileName);
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(multipartFile.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

    private void removeLocalFile(File file) {
        if (file.delete()) {
            return;
        }
    }

    private Optional<String> getExtensionByStringHandling(String filename) {
        return Optional.ofNullable(filename)
            .filter(f -> f.contains("."))
            .map(f -> f.substring(filename.lastIndexOf(".") + 1));
    }
}

