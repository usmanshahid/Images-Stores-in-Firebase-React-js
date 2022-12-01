import React, { Container, Box } from '@mui/system'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { storagefirebase } from './firebase'
import { ref, uploadBytes, list, listAll, getDownloadURL, } from "firebase/storage";
import { v4 } from "uuid"

function FireBAseImageUpload() {

    const [imageUpload, SetImageUplaod] = useState(null)
    const [imageUrls, setImageUrls] = useState([]);
    const imagesListRef = ref(storagefirebase, "images/");

    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storagefirebase, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });

    }
    // useEffect(() => {
    //     listAll(imagesListRef).then((response) => {
    //         response.items.forEach((item) => {
    //             getDownloadURL(item).then((url) => {
    //                 setImageUrls((prev) => [...prev, url]);
    //             });
    //         });
    //     });
    // }, [])

    const Refresh =()=>
    {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }


    return (
        <>
            <Container>
                <Grid container>
                    <Grid item
                        md={12}
                        xs={12}
                    >
                        <Box sx={{
                            border: "2px ", textAlign: "center",
                            marginTop: "50px",
                        }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    SetImageUplaod(event.target.files[0])
                                }}
                            />
                            <Button variant="contained" 
                                onClick={uploadFile}>Upload Image to Firebase </Button>

                                
                            <Button variant="contained" sx={{marginLeft:"20px"}}
                                onClick={Refresh}>Retrive  Image form Data Base</Button>
                        </Box>
                    </Grid>

                    <Box sx={{ marginTop: "50px", gap: "10px", display: "flex",flexDirection:"column" }}>
                       
                        {
                            imageUrls.map((url) => {
                                return <img src={url} width="30%" />;
                            })
                        }
                        {/* </Grid> */}
                    </Box>
                </Grid>
            </Container>
        </>
    )
}
export default FireBAseImageUpload