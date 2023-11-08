import React, { useState } from "react";
import "./ServicesList.scss";
import { Backdrop, Fab, Grid } from "@mui/material";
import {Add, Star} from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
    
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,   
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
};

export const ServicesList = ({ servicesParam }) => {
    console.log("Service param", servicesParam);
    const [open, setOpen] = React.useState(false);
    const [SelectedService, setSelectedService] = useState("");

    const handleOpen = (serviceId) => {
        const service = servicesParam.find((service) => service._id === serviceId);
        setSelectedService(service);
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    return (
        <div className="content-services-list">
        <h2>Services List</h2>
        <div>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={4}>
                <div className="grid1-style">
                <h2>Grid1</h2>
                </div>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
                <div className="grid2-style">
                <h2>Grid1</h2>
                </div>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
                <div className="grid3-style">
                <h2>Grid1</h2>
                </div>
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={8} sm={8} md={8}>
                <div className="grid4-style">
                    <h2>Servicios</h2>
                    <Grid container spacing={2}>
                        <Grid item xs={8} sm={8} md={8} className="grid-container-image">
                            <div className="img-content-grid">
                                {servicesParam.length > 0 ? (
                                    servicesParam.map((service) => (
                                        <div key={service._id}>
                                            <img src={service.avatar} alt={service.nameService} onClick={() => handleOpen(service._id)}></img>
                                                <Modal
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                                            {SelectedService.nameService}
                                                        </Typography>
                                                        <img src={SelectedService.avatar} alt={SelectedService.nameService} style={{width:'400px', height:'auto',borderRadius:'5px'}}/>
                                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                            {SelectedService.serviceDescription}
                                                        </Typography>
                                                    </Box>
                                                </Modal>
                                            <div className="button-fav-group">
                                                <Fab className="btn-icon" color="primary" aria-label="Favorite icon">
                                                    <Star/>
                                                </Fab>
                                                <Fab className="btn-icon" color="secondary" aria-label="Add icon">
                                                    <Add/>
                                                </Fab>
                                            </div>
                                        </div>
                                    ))
                                ):(
                                    <p>No hay servicios</p>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4}>
                            <div className="text-content-grid">
                                {/* {servicesParam.length > 0 ? (
                                    servicesParam.map((service) => (
                                        <div key={service._id}>
                                            <p>{service.nameService}</p>
                                            <p>{service.serviceDescription}</p>
                                        </div>
                                    ))
                                ):(
                                    <p>No hay servicios</p>
                                )} */}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
                <div className="grid2-style">
                <h2>Grid2</h2>
                </div>
            </Grid>
            </Grid>
        </div>
        </div>
    );
};
