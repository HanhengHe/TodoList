const MULTITASKS = [
    {
        userName: "MainPage: u1's task",
        userId: "u1",
        tasks: [{
            id:"id_0", 
            name:"name_0", 
            check_disable:false,
            item_title:"taskVal_0",
            item_title_editable:false,
            item_description:"Des_0",
            item_description_editable:false
        },
        {
            id:"id_1", 
            name:"name_1", 
            check_disable:true,
            item_title:"taskVal_1",
            item_title_editable:true,
            item_description:"Des_1",
            item_description_editable:true
        },
        {
            id:"id_2", 
            name:"name_2", 
            check_disable:true,
            item_title:"taskVal_2",
            item_description:"Des_2"
        },
        {
            id:"id_3", 
            name:"name_3", 
            check_disable:true,
            item_title:"taskVal_3",
            item_description:"Des_3"
        }]
    },
    {
        userName: "MainPage: u2's task",
        userId: "u2",
        tasks: [{
            id:"id_4", 
            name:"name_4", 
            check_disable:true,
            item_title:"taskVal_4",
            item_description:"Des_4"
        },
        {
            id:"id_5", 
            name:"name_5", 
            check_disable:true,
            item_title:"taskVal_5",
            item_description:"Des_5"
        },
        {
            id:"id_6", 
            name:"name_6", 
            check_disable:true,
            item_title:"taskVal_6",
            item_description:"Des_6"
        },
        {
            id:"id_7", 
            name:"name_7", 
            check_disable:true,
            item_title:"taskVal_7",
            item_description:"Des_7"
        }]
    }
];

export const queryMainPage = () => {
    return MULTITASKS;
};

export const queryMyPage = () => {
    return MULTITASKS;
};

export const queryDispatchedPage = () => {
    return MULTITASKS;
};