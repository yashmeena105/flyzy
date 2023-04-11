import { Select } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import paths from 'services/apiConstants';
import { AxiosAll } from 'services/NetworkEngine';

const SelectAssignee = ({ leadId, options, defaultValue }) => {
    const initialValue = options.find(element => element?.name == defaultValue?.name);
    const [value, setValue] = useState();
    const { authuser } = useSelector((state) => state.auth);

    const updateLead = async (values) => {
        const data = {
            lead_id: leadId,
            assignee: values
        }
        console.log("data", data);
        let res = await AxiosAll("PUT", paths?.updateLeads, data, authuser?.user?.user?.uid);
        if (res?.status == 200) {
            console.log("successsfully done");
        }
    };

    return (
        <div>
            {defaultValue && <Select defaultValue={defaultValue} style={{ width: 120, zIndex: 1 }} onChange={(e) => {
                setValue(e.target.value);
                updateLead(options.find(element => element?.name == e.target.value));
            }} options={options?.map((item, index) => { item.label = item.name; return item })} />}
        </div>
    );
};

export default SelectAssignee;
