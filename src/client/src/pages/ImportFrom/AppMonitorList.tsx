import {
    Checkbox,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { appMonitorDtoType } from '../../lib/api/monitorsApi';
import { useState } from 'react';
import { variabilize } from '../../locale/utils';
import { locale } from '../../locale';

function AppMonitorList(props: { appMonitorsDtos: appMonitorDtoType[] }) {
    const initialSelectedIndexes = props.appMonitorsDtos.map((_, index) => index);
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>(initialSelectedIndexes);
    return (
        <List dense={true}>
            {props.appMonitorsDtos.map((appMonitorDto, index) => (
                <ListItemButton key={appMonitorDto.displayName} onClick={buildOnItemClick(index)}>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={selectedIndexes.includes(index)}
                            disableRipple
                        />
                    </ListItemIcon>
                    <ListItem>
                        <ListItemText
                            primary={computeListItemPrimaryText(appMonitorDto)}
                            secondary={appMonitorDto.url}
                        />
                    </ListItem>
                </ListItemButton>
            ))}
        </List>
    );

    function buildOnItemClick(index: number) {
        return () => {
            const indexOfSelectedIndex = selectedIndexes.indexOf(index);
            if (indexOfSelectedIndex === -1) {
                setSelectedIndexes([...selectedIndexes, index]);
            } else {
                setSelectedIndexes(
                    selectedIndexes.filter((selectedIndex) => selectedIndex !== index),
                );
            }
        };
    }
}

function computeListItemPrimaryText(appMonitorDto: appMonitorDtoType) {
    const frequencyText = variabilize(locale.importFrom.uptimeRobot.list.frequencyLabel, {
        frequency: appMonitorDto.frequency,
    });
    return `${appMonitorDto.displayName} (${frequencyText})`;
}

export { AppMonitorList };
