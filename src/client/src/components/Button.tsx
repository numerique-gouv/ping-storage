import { LoadingButton } from '@mui/lab';
import { Button as MuiButton } from '@mui/material';
import { ReactNode } from 'react';

function Button(props: {
    fullWidth?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: string | ReactNode;
    variant?: 'contained' | 'outlined' | 'text';
    disabled?: boolean;
    type?: 'submit';
    title?: string;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
    isLoading?: boolean;
    color?: 'primary' | 'error' | 'inherit' | 'success' | 'warning';
}) {
    if (props.isLoading !== undefined) {
        return (
            <LoadingButton
                loading={props.isLoading}
                color={props.color}
                title={props.title}
                startIcon={props.startIcon}
                endIcon={props.endIcon}
                type={props.type}
                fullWidth={props.fullWidth}
                variant={props.variant}
                onClick={props.onClick}
                disabled={props.disabled}
            >
                {props.children}
            </LoadingButton>
        );
    }
    return (
        <MuiButton
            color={props.color}
            title={props.title}
            startIcon={props.startIcon}
            endIcon={props.endIcon}
            type={props.type}
            fullWidth={props.fullWidth}
            variant={props.variant}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </MuiButton>
    );
}

export { Button };
