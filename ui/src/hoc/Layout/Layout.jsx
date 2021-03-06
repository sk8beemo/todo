import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Layout(props) {
    const classes = useStyles();

    return (
        <div className={classes.Layout}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton disabled edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        ZORBUM
                    </Typography>
                    {
                        props.isAuth
                        ? <Button color="inherit">Logout</Button>
                        : <Button color="inherit">Login</Button>
                    }
                </Toolbar>
            </AppBar>
            <main>
                {props.children}
            </main>
        </div>
    )
}