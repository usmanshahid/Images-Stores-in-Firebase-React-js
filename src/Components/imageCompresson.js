import React, { Container, Box } from '@mui/system'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import { Typography } from '@mui/material';
import { useState,useEffect} from 'react';
import { storagefirebase } from './firebase1'
import { ref, uploadBytes,list,listAll,getDownloadURL, } from "firebase/storage";
import { v4 } from "uuid"

function ImageCompresson() {

    const [imageUpload, SetImageUplaod] = useState(null)
    const [imageUrls, setImageUrls] = useState([]);
    const imagesListRef = ref(storagefirebase, "images/");
    
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storagefirebase, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {

            alert("image upload ")
        })
       

    }
    useEffect(()=>{
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                setImageUrls((prev) => [...prev, url]);
              });
            });
          });
    },[])
    
    return (
        <>
            <Container>
                <Grid container>
                    <Grid item
                        md={4.5}
                        xs={12}
                    >
                        {/* <Typography sx={{ fontWeight: "bold", fontSize: "20px", marginTop: "40px" }}>
                            Before Image
                        </Typography>
                        <Box >
                            <img src={emptyimage} />
                        </Box> */}

                    </Grid>

                    <Grid item
                        md={3}
                        xs={12}
                    >
                        <Box sx={{
                            border: "2px ", paddingTop: "30%", textAlign: "center"
                        }}>
                            <input
                                type="file"
                                accept="image/*"

                                onChange={(event) => {
                                    SetImageUplaod(event.target.files[0])
                                }}
                            />
                            <Button variant="contained" sx={{ marginTop: "20px" }}
                             onClick={uploadFile}>Upload Image to Firebase </Button>
                        </Box>
                    </Grid>

                    <Grid item
                        md={4.5}
                        xs={12}
                    >
                        {/* <Typography sx={{ fontWeight: "bold", fontSize: "20px", marginTop: "40px" }}>
                            After Image
                        </Typography>
                        <Box >
                            <img src={emptyimage} />
                        </Box> */}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
export default ImageCompresson