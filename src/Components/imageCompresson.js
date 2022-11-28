import React, { Container, Box } from '@mui/system'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import { Typography } from '@mui/material';
import { useState } from 'react';
import emptyimage from './images/emptyimage.JPG'
import imageCompression from 'browser-image-compression';

function ImageCompresson() {
    const [origImage, SetOrigImage] = useState('')
    const [origImageFile, SetOrigImageFile] = useState('')
    const [conpressedImage, SetconpressedImage] = useState('')
    const [fileName, setFileName] = useState('')
    const handle = (e) => {

        const imageFile=e.target.files[0];
        SetOrigImage(imageFile);
        SetOrigImageFile(URL.createObjectURL(imageFile));
        setFileName(imageFile.name);
    }
    const handelCompress=(e)=>{
        e.preventDefault()
        const options={
            maxSizeMb:1,
            maxWidthorHeight:500,
            useWebWorker:true
        }
        if(options.maxSizeMb >=origImage/1024)
        {
            alert("Image Size is Too Small ,cannot Be Compressed ")
            return 0;
        }
        let output;
        imageCompression(origImage,options).then((x)=>
        {
            output=x;
            const downloadLink=URL.createObjectURL(output)
            SetconpressedImage(downloadLink)
        })



    }
    return (
        <>
            <Container>
                <Grid container>
                    <Grid item
                        md={4.5}
                        xs={12}
                    >
                        <Typography sx={{ fontWeight: "bold", fontSize: "20px", marginTop: "40px" }}>
                            Before Image
                        </Typography>
                        <Box >
                        {origImageFile ? (  <img src={origImageFile} width="100%" />) : <img src={emptyimage} />}
                        </Box>

                    </Grid>

                    <Grid item
                        md={3}
                        xs={12}
                    >
                        <Box sx={{
                            border: "2px ", paddingTop: "30%", textAlign:"center"
                        }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handle(e)}
                            />

                          {origImageFile &&  <Button variant="contained" sx={{marginTop:"20px"}} onClick={(e)=>{handelCompress(e)}}>Compressed Image</Button>}
                          {conpressedImage &&  <Button variant="contained" sx={{marginTop:"20px"}} > <a href={conpressedImage} download={fileName }>{" "} Download Image</a></Button>}

                        </Box>
                    </Grid>

                    <Grid item
                        md={4.5}
                        xs={12}
                    >
                        <Typography sx={{ fontWeight: "bold", fontSize: "20px", marginTop: "40px" }}>
                            After Image
                        </Typography>
                        <Box >
                        {conpressedImage ? (  <img src={conpressedImage}  width="100%" />) : <img src={emptyimage} />}
                        </Box>

                    </Grid>

                </Grid>
            </Container>
        </>
    )
}

export default ImageCompresson