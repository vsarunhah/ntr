export const navbarStyles = {
    drawer: {
        width: 300,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: 220,
            boxSizing: 'border-box',
            backgroundColor: '#000000',
            color: 'rgba(255, 255, 255, 1)', 
        },
        '& .Mui-selected': {
            color: 'red',
        },
    },
    icons: {
        color: 'rgba(255, 255, 255, 1)!important',
        marginLeft: '20px',
    },
    text: {
        '& span': {
            marginLeft: '-10px',
            fontSize: '16px',
            fontFamily: 'Montserrat',
        }
    }
};