import React from 'react'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Dropdown } from 'antd';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import { useNavigate } from 'react-router-dom';

export default function DropDownMenu(props) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    }
    const items = [
        {
            key: '1',
            label: (
                <div className="options" onClick={props.showDrawer} >
                    <GroupsRoundedIcon style={{ color: "var(--dark)" }} />
                    <div>New Group</div>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div className="options">
                    <SettingsRoundedIcon style={{ color: "var(--dark)" }} />
                    <div>Setting</div>
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <>
                    <div className="options" onClick={handleLogout} >
                        <LogoutRoundedIcon style={{ color: "var(--dark)" }} />
                        <div>Logout</div>
                    </div>
                </>
            ),
        },
    ];
    return (
        <>
            <Dropdown
                menu={{
                    items,
                }}
                placement="bottomRight"
                arrow
            >
                <MoreVertRoundedIcon />
            </Dropdown>
        </>
    )
}
