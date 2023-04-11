import { Button } from '@mui/material';
import { SpinnerCircularFixed } from 'spinners-react';

const DarkBtn = ({ title, style, onClick, type, loading, disable }) => {
    return (
        <>
            <Button
                disabled={disable ? disable : false}
                // className="basket-btn darkbtn "
                style={style}
                onClick={onClick}
                type={type}
            >
                {loading ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <SpinnerCircularFixed size={15} color="#fff" />{' '}
                        <span
                            style={{
                                marginLeft: '5px',
                                color: '#fff'
                            }}
                        >
                            {' '}
                            Loading...
                        </span>
                    </div>
                ) : (
                    title
                )}
            </Button>
        </>
    );
};

export default DarkBtn;
