'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { convertFileToUrl } from '@/lib/utils';

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className='file-upload'>
      <input {...getInputProps()} />
      {files && files?.length > 0 ?
        <Image
          src={convertFileToUrl(files[0])}
          alt={'uploaded image'}
          width={1000}
          height={1000}
          className='max-h-[400px] overflow-hidden object-cover'
        />
      : <>
          <Image
            src='/assets/icons/upload.svg'
            alt='upload'
            width={40}
            height={40}
          />
          <div className='file-upload_label'>
            <p className='text-14-regular'>
              <span className='text-green-500'>Click to Upload</span>
              or Drag and Drop
            </p>
            <p>SVG, PNG, JPG, PDF (max 800x400)</p>
          </div>
        </>
      }
    </div>
  );
};

export default FileUploader;