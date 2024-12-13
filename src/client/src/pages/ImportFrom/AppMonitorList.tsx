import {
    Checkbox,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { appMonitorDtoType, monitorsApi } from '../../lib/api/monitorsApi';
import { useState } from 'react';
import { variabilize } from '../../locale/utils';
import { locale } from '../../locale';
import { Button } from '../../components/Button';
import { useApiCall } from '../../lib/useApiCall';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../../lib/pathHandler';

function AppMonitorList(props: { appMonitorsDtos: appMonitorDtoType[] }) {
    // const initialSelectedIndexes = props.appMonitorsDtos.map((_, index) => index);
    const initialSelectedIndexes: number[] = [];
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>(initialSelectedIndexes);
    const navigate = useNavigate();
    const createMonitorsApiCall = useApiCall({
        apiCall: monitorsApi.createMonitors,
        successText: locale.importFrom.uptimeRobot.list.successMessage,
        queryKeyToInvalidate: ['me', 'monitors'],
        onSuccess: () => {
            navigate(pathHandler.getRoutePath('MONITORS'));
        },
    });
    return (
        <>
            <List dense={true}>
                {props.appMonitorsDtos.map((appMonitorDto, index) => (
                    <ListItemButton
                        key={appMonitorDto.displayName}
                        onClick={buildOnItemClick(index)}
                    >
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
            <Button onClick={importMonitors} isLoading={createMonitorsApiCall.isLoading}>
                {locale.importFrom.uptimeRobot.list.importButton}
            </Button>
        </>
    );

    function importMonitors() {
        const selectedAppMonitorDtos = selectedIndexes.map((index) => props.appMonitorsDtos[index]);
        createMonitorsApiCall.perform(selectedAppMonitorDtos);
    }

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
