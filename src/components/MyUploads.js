import React,{useEffect, useState} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import './navbar.css'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
});

var fileDownload = require('js-file-download');

const MyUploads = () => {
	const classes = useStyles();
	const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const fetchUploads = async () => {
		setLoading(true);
        const res = await axios.get('https://slidertest321.herokuapp.com/api/uploadedfiles', { headers: {'Authorization': `JWT ${localStorage.getItem('access')}`} });
        setPosts(res.data);
		setLoading(false);
    	console.log("upload api data",res.data);
        console.log("uploads const data",posts);
        };
    
        fetchUploads();
    }, []);

	// download function
    // const handleDownload = () => {
    //     const downloadData = new FormData();
    //     downloadData.append("file_name","/documents/2.png");
    //     const url = "https://slidertest321.herokuapp.com/download/";

    //     axios.post(url,downloadData,{
    //         responseType:'blob',
    //     })
    //     .then(res=> {
    //         fileDownload(res.data,"/documents/B171129_P.Gopi_SS_Assignment_5.pdf");
    //         console.log(res);
            
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }

	if(loading){
        return <h2 className="text-center">Loading...</h2>
    }

	return(
		<>
		
			<Container maxWidth="md">
				<Grid container spacing={5} alignItems="flex-end">
					{posts.map((post) => {                                
						return(
							<Grid item key={post.id} xs={12} md={4}>
								<Card className={classes.card}>
									<CardActionArea>
										<CardMedia
										className={classes.media}
										image="imgurl"
										title="title name"
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="h2">
												{post.name}
											</Typography>   
											<div className="d-flex flex-row">
												<label>Departments:</label>                                                                                         
												{post.filedep.map(dep=>(                                                    
													<div className="boxdeps">
														{dep.department},
													</div>
												))}
											</div>

											<div className="d-flex flex-row hashtagdisplay">
												<label>Hashtags:</label>                                                                                         
												{post.filecat.map(cat=>(                                                    
													<div className="boxdeps">
														{cat.category},
													</div>
												))}
											</div>                                                                                            
										</CardContent>
									</CardActionArea>
									<CardActions>
										<Button size="small" color="primary">
											View
										</Button>
										<Button size="small" color="primary" target="_blank">
											Download
										</Button>
									</CardActions>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</>
	);

}

export default MyUploads;
