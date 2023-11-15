import React from 'react';
import './MenuOptionsUser.scss';
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const MenuOptionsUser = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        } else if (event.key === 'Escape') {
        setOpen(false);
        }
    }

  // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <Stack direction="row" spacing={2} className='container-menu-options'>
            <div className='menu-options'>
                <KeyboardArrowDownIcon 
                className='arrow-icon'
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                />
                <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                >
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                    >
                    <Paper className='paper'>
                        <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                            className='menulist'
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                        >
                            <MenuItem onClick={handleClose}>Cancelar Cuenta</MenuItem>
                            <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
                </Popper>
            </div>
        </Stack>
    );
}
