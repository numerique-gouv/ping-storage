import { Button } from '../../components/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { locale } from '../../locale';
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../../lib/pathHandler';

function ImportMonitorsButton() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    return (
        <>
            <Button endIcon={<ArrowDropDownIcon />} onClick={openMenu}>
                {locale.monitors.importMonitorsButton.label}
            </Button>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeMenu}>
                <MenuItem onClick={navigateToUptimeRobot}>UptimeRobot</MenuItem>
            </Menu>
        </>
    );

    function navigateToUptimeRobot() {
        navigate(pathHandler.getRoutePath('IMPORT_FROM_UPTIME_ROBOT'));
        closeMenu();
    }

    function openMenu(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function closeMenu() {
        setAnchorEl(null);
    }
}

export { ImportMonitorsButton };
