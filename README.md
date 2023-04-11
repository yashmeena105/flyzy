### Auth Screen

<!-- #### 1. POST /user/reset-password
* send reset password email


Request
```javascript
{
}
```
Response - Success
```javascript
{
}
```
Response - Fail
```javascript
{
}
``` -->

#### 1. POST /user/register

- firebase auth register webhook
- save user data in mongodb
- create new default company
- set user.company_id
- set user.active_in_company to true
- set company_id to firebase auth custom claims
- set company.active to true
- set company.company_is_new to true

Request

```javascript
{
    "uid":"2",
    "email":"ishupasricha@gmail.com",
    "emailVerified":true,
    "displayName":"ISHU",
    "phone_number":9896662867,
    "disabled":false,
    "providerData":	[{"email":"ishu@gmail.com","providerId":"password","uid":"34"}]
}
```

Response - Success

```javascript
{
  ("User Added Successfully");
}
```

Response - Fail

```javascript
{
    "Error occured while registering user" --- message error
}
```

#### 3. POST company/update-details

- superAdmin or ADMIN are allowed

Request

```javascript
{
    "business_name":"Bahiji Shikanji",
    "line1":"11222",
    "line2":"plot no. 12",
    "state":"HAryana",
    "city":"karnal"
}
// TODO: Add all possible fields like logo, tax_info.gstin, etc. etc.
```

Response - Success

```javascript
{
    "message": "Successfully updated company details"
}
```

Response - Fail

```javascript
{
    "Unable to update company." ----why message
}
```

### Profile Settings Screen

#### 1. POST /user/get-my-invites

Request

```javascript
{
}
```

Response - Success

```javascript
[
  {
    _id: "632fd7e05a999eed2f168faa",
    email: "Hansraj@gmail.com",
    phone_number: 98999999999,
    role: "ADMIN",
    company_id: "632f1e8abdd3879e89a9431f",
    business_name: "Bahiji Shikanji",
    name: "Hansraj",
    created_utc_timestamp: "2022-09-25T04:24:00.445Z",
    __v: 0,
  },
  {
    _id: "632fd8db8810c0143841a5d2",
    email: "Hansraj@gmail.com",
    phone_number: 98999999999,
    role: "ADMIN",
    company_id: "632f1f33b8e85992c21f37c6",
    business_name: "ISHU's org",
    name: "Hansraj",
    created_utc_timestamp: "2022-09-25T04:28:11.747Z",
    __v: 0,
  },
];
```

Response - Fail

```javascript
{
  `Unable to retrieve invites.${err.message}`;
}
```

#### 2. POST /user/invite-action

Request

```javascript
{
    "action":"Declined"/"Accepted,
    "_id":"632fd7e05a999eed2f168faa"
}
```

Response - Success

```javascript
{
    "message": "Declined/Accepted Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while updating invite"- ${err.message}
}
```

#### 3. POST /user/get-my-profile

Request

```javascript
{
}
```

Response - Success

```javascript
{
    "user_info": {
        "email": "Hansraj@gmail.com",
        "email_verfied": true,
        "display_name": "ISHU",
        "phone_number": 9896662867
    },
    "auth_info": {
        "created_utc_timestamp": "2022-09-25T04:31:16.760Z"
    },
    "_id": "632fd994fe0bae9ff5d34665",
    "provider_id": "3",
    "disabled": false,
    "role": "ADMIN",
    "provider_data": [
        {
            "email": "ishu@gmail.com",
            "providerId": "password",
            "uid": "34",
            "_id": "632fd994fe0bae9ff5d34666"
        }
    ],
    "active_in_company": true,
    "last_seen": "2022-09-25T04:31:15.392Z",
    "company_id": "632fd994fe0bae9ff5d34667",
    "__v": 0
}
```

Response - Fail

```javascript
{
    "Unable to retrieve details."- ${err.message}
}
```

#### 4. POST /user/update-profile

Request

```javascript
{
    "name":"HansRaj Patel"
}
```

Response - Success

```javascript
{
    "message": "User Details updated Successfully"
}
```

Response - Fail

```javascript
{
    "Unable to update user details."- ${err.message}
}
```

#### 5. POST notification/user/get-notifications

Request

```javascript
{
}
```

Response - Success

```javascript
[
  {
    _id: "632f1e8abdd3879e89a94320",
    notificationMessage: "ISHU welcome to bookhere app on ",
    user_id: "632f1e8abdd3879e89a9431d",
  },
];
```

Response - Fail

```javascript
{
    "Unable to find notification.."- ${err.message}
}
```

#### 6. POST notification/user/delete-notification

Request

```javascript
{
    "notification_id":"632f1e8abdd3879e89a94320"
}
```

Response - Success

```javascript
{
    "message": "Notification read"
}
```

Response - Fail

```javascript
{
  ("Unable to update notifiation read prop.");
}
```

#### 7.POST notification/user/delete-notifications

Request

```javascript
{
}
```

Response - Success

```javascript
{
    "message": "Notification Cleared"
}
```

Response - Fail

```javascript
{
  ("Unable to delete notification");
}
```

Request-delete-account

#### 8. POST /user/delete-fatal

Request

```javascript
{
    "delete_user":true / "delete_company":true
}
```

Response - Success

```javascript
{
    "message": "Request Submitted Successfully for delete your account"
}
```

Response - Fail

```javascript
{
  ("Error occured while sending user delete request");
}
```

#### 9.POST notification/user/delete-notifications

Request

```javascript
{
}
```

Response - Success

```javascript
{
    "message": "Notification Cleared"
}
```

Response - Fail

```javascript
{
  ("Unable to delete notification");
}
```

### Other Settings Screens

#### 1. POST user/company/get-details

Request

```javascript
{
}
```

Response - Success

```javascript
{
    "primary_contact": {
        "name": "ISHU",
        "email": "ishupasricha@gmail.com",
        "phone_number": "9896662867"
    },
    "_id": "632f1f33b8e85992c21f37c6",
    "business_name": "ISHU's org",
    "active": true,
    "is_deleted": false
}
```

Response - Fail

```javascript
{
    "Unable to retrieve details."${err.message}
}
```

- Don't send assets etc.

#### 2. POST user/company/invite-user

Request

```javascript
{
    "name":"Muskan",
    "email":"muskan@gmail.com",
    "phone_number":"98978892289",
    "role":"orgMember"
}
```

Response - Success

```javascript
{
    "message": "Invite Sent Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while sending invite"${err.message}
}
```

#### 3. POST user/company/update-user-access

Request

```javascript
{
    "_id":"632f1e8abdd3879e89a9431d",
    "role":"ADMIN"
}
```

Response - Success

```javascript
{
    "message": "Role updated Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while updating role"${err.message}
}
```

#### 4. POST user/company/deactivate-user

Request

```javascript
{
    "user_id":"632f1f33b8e85992c21f37c4"
}
```

Response - Success

```javascript
{
    "message": "Deactivated Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while deactivating"${err.message}
}
```

- Can only deactivate. If need to reactivate, invite again.

#### 7. POST /company/request-delete-company

is equals user/delete-fatal

#### 8. POST /company/delete-company

get user/delete-fatal

#### 9. POST company/update-details

mentioned above.

### Other Settings Screens

#### 1. POST /company/get-details

#### 2. POST /company/invite-user

#### 3. POST /company/update-user-access

#### 4. /company/deactivate-user

#### 5. /user/get-notifications

#### 6. /user/delete-notification

#### 7. /user/request-delete-account

#### 8. /user/delete-user

1-8 are already mentioned above

### Master Page

#### 1. /company/add-stay

Request

```javascript
{
  "destination_id":"633184af899f6ff7bb387075",
  "type": "tyuio",
  "masterStay_name":"tyui",
  "description":"rtyuio",
  "images": [{
    "name": "tyui",
    "mimetype": "hjk",
    "size": "789",
    "type":"56789"
  }],
  "address":"123443243",
  "address_map_link":"23432",
  "end_address":"23432",
  "end_address_map_link":"234"
}
```

Response - Success

```javascript
{
    "message": "Stay Added Successfully",
    "uploadURL": [
        "https://master-stay/Images/%2A830%2Atyui?Content-Type=hjk&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA27RKLSM2MXLQJKOE%2F20220927%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220927T141510Z&X-Amz-Expires=900&X-Amz-Signature=22802dcbd1b4fc5db772096c76840b81e2504bcf2d67a2a3de05330d5272be87&X-Amz-SignedHeaders=host%3Bx-amz-acl&x-amz-acl=public-read"
    ]
}
```

Response - Fail

```javascript
{
    "Error occured while adding stay"${err.message}
}
```

#### 1. /company/update-stay

Request

```javascript
{
    "id":"63330629cce59954b1d4a237",
    "type":"Ishu"
}
```

Response - Success

```javascript
{
    "message": "Stay Updated Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while updating stay"${err.message}
}
```

#### 1. /company/delete-stay

Request

```javascript
{
    "_id":"633184af899f6ff7bb387075"
}
```

Response - Success

```javascript
{
    "message": "Stay deleted Successfully",
}
```

Response - Fail

```javascript
{
    "Error occured while deleting stay"${err.message}
}
```

#### 1. /company/add-activity

Request

```javascript
{
  "destination_id":"633184af899f6ff7bb387075",
  "type": "tyuio",
  "activity_name":"tyui",
  "description":"rtyuio",
  "images": [{
    "name": "tyui",
    "mimetype": "hjk",
    "size": "789",
    "type":"56789"
  }],
  "address":"123443243",
  "address_map_link":"23432",
  "end_address":"23432",
  "end_address_map_link":"234"
}
```

Response - Success

```javascript
{
    "message": "Activity Added Successfully",
    "uploadURL": [
        "https://master-stay/Images/%2A830%2Atyui?Content-Type=hjk&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA27RKLSM2MXLQJKOE%2F20220927%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220927T141510Z&X-Amz-Expires=900&X-Amz-Signature=22802dcbd1b4fc5db772096c76840b81e2504bcf2d67a2a3de05330d5272be87&X-Amz-SignedHeaders=host%3Bx-amz-acl&x-amz-acl=public-read"
    ]
}
```

Response - Fail

```javascript
{
    "Error occured while adding activity"${err.message}
}
```

#### 1. /company/update-activity

Request

```javascript
{
    "id":"633306dfe7d2695518f70f64",
    "type":"Ishu678"
}
```

Response - Success

```javascript
{
    "message": "Activity updated successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while updating stay"${err.message}
}
```

#### 1. /company/delete-activity

Request

```javascript
{
    "_id":"633306dfe7d2695518f70f64"
}
```

Response - Success

```javascript
{
    "message": "Activity Deleted Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while deleting activity"${err.message}
}
```

#### 1. /company/upload-asset

Request

```javascript
{
"company_id":"63314d4560dbb247f6deb32f",
  "assets": [{
    "name": "tyui",
    "mimetype": "hjk",
    "size": "789",
    "type":"56789"
  }]
}
```

Response - Success

```javascript
{
    "uploadUrl": [
        "https://comapny-assets/63314d4560dbb247f6deb32f/%2A750%2Atyui?Content-Type=hjk&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA27RKLSM2MXLQJKOE%2F20220927%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220927T144633Z&X-Amz-Expires=900&X-Amz-Signature=091860c82c87655e30237eba5cffd987876dce7f32e5098b820dcc719b9f8813&X-Amz-SignedHeaders=host%3Bx-amz-acl&x-amz-acl=public-read"
    ],
    "message": "Asset uploaded Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while uploading assets"${err.message}
}
```

#### 1. /company/update-asset

Request

```javascript
{
    "parent_id":"63314d4560dbb247f6deb32f",
    "child_id":"63330cc99910d4900c6a4726",
    "name":"Bahiii"
}
```

Response - Success

```javascript
{
    "message": "Asset name updated successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while updating asset"${err.message}
}
```

#### 1. /company/delete-asset

Request

```javascript
{
    "parent_id":"63314d4560dbb247f6deb32f",
    "child_id":"63330cc99910d4900c6a4726"
}
```

Response - Success

```javascript
{
    "message": "Asset Deleted Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while deleting asset"${err.message}
}
```

### Leads Page

#### 1. POST /leads/get-leads

- if body contains search_text, search by customer name, customer id, lead id, destination
- if body contains page size and skip, return paginated results
  Request

```javascript
{
    "search_text":"Rahul"
}
```

Response - Success

```javascript
[
  {
    travel_dates: {
      from_date: "2022-07-08T07:00:00.000Z",
      to_date: "2022-07-15T07:00:00.000Z",
    },
    pax: {
      adult: 1,
      child: 0,
      infant: 0,
    },
    _id: "63318791c3a3539fe46c7f69",
    lead_id: "801741",
    company_id: "63314d60abedf29b6e61e024",
    status: "New Lead",
    customer_name: "Rahul",
    lead_source: "Social",
    no_of_days: 7,
    assignee_email: "ishu@gmail.com",
    on_app: false,
    destinations: [],
    lead_type: "Standard",
    email: "jugnu@gmail.com",
    author_id: "633158c25c9a7e90a3d5f7ca",
    created_utc_timestamp: "2022-09-26T10:53:35.000Z",
    requirements: [],
    guest_documents: [],
    whatsapp_number: 9896662867,
    phone_number: 9896662867,
    customer_id: "633184af899f6ff7bb387076",
    __v: 0,
  },
];
```

Response - Fail

```javascript
{
    "Unable to find leads."${err.message}
}
```

#### 2. /leads/update-details

- assignee_id in body, update lead.assignee
- if user.role == superAdmin, allow
- if user.role == ADMIN or member && user.company_id == lead.company_id, allow
- if company doesn't match, deny
  Request

```javascript
{
    "lead_id":"63318791c3a3539fe46c7f69",
    "customer_name":"Shikanji"
}
```

Response - Success

```javascript
{
    "message": "Lead Updated Successfully",
    "data": {
        "travel_dates": {
            "from_date": "2022-07-08T07:00:00.000Z",
            "to_date": "2022-07-15T07:00:00.000Z"
        },
        "pax": {
            "adult": 1,
            "child": 0,
            "infant": 0
        },
        "_id": "63318791c3a3539fe46c7f69",
        "lead_id": "801741",
        "company_id": "63314d60abedf29b6e61e024",
        "status": "New Lead",
        "customer_name": "Shikanji",
        "lead_source": "Social",
        "no_of_days": 7,
        "assignee_email": "ishu@gmail.com",
        "on_app": false,
        "destinations": [],
        "lead_type": "Standard",
        "email": "jugnu@gmail.com",
        "author_id": "633158c25c9a7e90a3d5f7ca",
        "created_utc_timestamp": "2022-09-26T10:53:35.000Z",
        "requirements": [],
        "guest_documents": [],
        "whatsapp_number": 9896662867,
        "phone_number": 9896662867,
        "customer_id": "633184af899f6ff7bb387076",
        "__v": 0
    }
}
```

Response - Fail

```javascript
{
    "Unable to update lead."${err.message}
}
```

### Add Lead Form

#### 1. /company/get-customers

- if body contains search_text, search by customer name
  Request

```javascript
{
    "search_text":"Shikanji"
}
```

Response - Success

```javascript
[
  {
    _id: "633184af899f6ff7bb387076",
    company_id: "63314d60abedf29b6e61e024",
    customer_name: "Jugnu",
    author_id: "633158c25c9a7e90a3d5f7ca",
    created_utc_timestamp: "2022-09-26T10:53:35.000Z",
    customer_id: "633184af899f6ff7bb387076",
    email: "jugnu@gmail.com",
    whatsapp_number: 9896662867,
    phone_number: 9896662867,
    __v: 0,
  },
];
```

Response - Fail

```javascript
{
    "Unable to find customers."${err.message}
}
```

#### 2. /public/get-destinations

- return all destinations from public list
  Request

```javascript
{
    "search_text":"Shikanji"
}
```

Response - Success

```javascript
[
  {
    _id: "63317423aab4bfc77acfa8d6",
    id: "777244",
    city: "Jind",
    state: "Haryana",
    country: "India",
    country_code: "+91",
    timezone: "+5.30",
    __v: 0,
  },
  {
    _id: "6331742d329baef5008ab405",
    id: "417027",
    city: "Karnal1",
    state: "Haryana",
    country: "India",
    country_code: "+91",
    timezone: "+5.30",
    __v: 0,
  },
  {
    _id: "633174383c055d8d97a40f24",
    id: "471593",
    city: "Karnal2",
    state: "Haryana",
    country: "India",
    country_code: "+91",
    timezone: "+5.30",
    __v: 0,
  },
];
```

Response - Fail

```javascript
{
    "Unable to find destinations."${err.message}
}
```

#### 3. /utils/check-whatsapp

- use third party API - contact hansraj(Frontend check this)

#### 4. /company/get-lead-sources

- return public + company's private lead sources !is_deleted
  Request

```javascript
{
}
```

Response - Success

```javascript
[
  {
    _id: "633191b42e4d316f0c6bb69b",
    id: "26649",
    is_deleted: false,
    source: "aaayaaa",
    company_id: "63314d60abedf29b6e61e024",
    author_id: "633158c25c9a7e90a3d5f7ca",
    created_utc_timestamp: "2022-09-26T11:49:08.000Z",
    __v: 0,
  },
  {
    _id: "633191bc4a63556fd9e48761",
    id: "886947",
    is_deleted: false,
    source: "bhrrrr",
    company_id: "63314d60abedf29b6e61e024",
    author_id: "633158c25c9a7e90a3d5f7ca",
    created_utc_timestamp: "2022-09-26T11:49:16.000Z",
    __v: 0,
  },
  {
    _id: "633192fad10b4af423512439",
    id: "961432",
    is_deleted: false,
    source: "bhrrrr45678",
    created_utc_timestamp: "2022-09-26T11:54:33.530Z",
    __v: 0,
  },
];
```

Response - Fail

```javascript
{
    "Unable to find leadsorce."${err.message}
}
```

#### 5. /company/get-member-names

- return users where active_in_company && !disabled && !deleted
  Request

```javascript
{
}
```

Response - Success

```javascript
[
  {
    _id: "633191b42e4d316f0c6bb69b",
    id: "26649",
    is_deleted: false,
    source: "aaayaaa",
    company_id: "63314d60abedf29b6e61e024",
    author_id: "633158c25c9a7e90a3d5f7ca",
    created_utc_timestamp: "2022-09-26T11:49:08.000Z",
    __v: 0,
  },
  {
    _id: "633191bc4a63556fd9e48761",
    id: "886947",
    is_deleted: false,
    source: "bhrrrr",
    company_id: "63314d60abedf29b6e61e024",
    author_id: "633158c25c9a7e90a3d5f7ca",
    created_utc_timestamp: "2022-09-26T11:49:16.000Z",
    __v: 0,
  },
  {
    _id: "633192fad10b4af423512439",
    id: "961432",
    is_deleted: false,
    source: "bhrrrr45678",
    created_utc_timestamp: "2022-09-26T11:54:33.530Z",
    __v: 0,
  },
];
```

Response - Fail

```javascript
{
    "Unable to find leadsource."${err.message}
}
```

#### 6. /lead/add-new

- save lead to db
- return all leads in descending order of creation date
- object schema in req & res must me identical
  Request

```javascript
{
    "customer_name":"Jugnu",
    "lead_source":"Social",
    "from_date": "2022-07-08T07:00:00.000+00:00",
    "to_date":"2022-07-15T07:00:00.000+00:00",
    "assignee_email":"ishu@gmail.com",
    "email":"jugnu@gmail.com",
    "whatsapp_number":9896662867,
    "whatsapp":true
}
```

Response - Success

```javascript
{
    "message": "Lead Generated Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while adding lead"${err.message}
}
```

### Edit Lead Form

#### 1. /lead/update-details

- allow superAdmin or member+ADMIN of same company
  Request

```javascript
{
    "customer_name":"Jugnu",
    "lead_source":"Social",
    "from_date": "2022-07-08T07:00:00.000+00:00",
    "to_date":"2022-07-15T07:00:00.000+00:00",
    "assignee_email":"ishu@gmail.com",
    "email":"jugnu@gmail.com",
    "whatsapp_number":9896662867,
    "whatsapp":true
}
```

Response - Success

```javascript
{
    "message": "Lead Generated Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while adding lead"${err.message}
}
```

### Itineraries Page

#### 1. /itinerary/get-itineraries

- if body contains search_text, search by itinerary name, id, destinations(not possible)
- return all TEMPLATE itineraries
- return lead details only(????);
  Request

```javascript
{
    "search_text":"95"
}
```

Response - Success

```javascript
[
  {
    _id: "63355d7f8a9584e96f51ae54",
    is_deleted: false,
    is_active: true,
    id: "959228",
    company_id: "63314d60abedf29b6e61e024",
    type: "TEMPLATE",
    is_confirmed: false,
    itinerary_name: "Dubai",
    destinations: [],
    days: [],
    author_id: "633158c25c9a7e90a3d5f7ca",
    created_utc_timestamp: "2022-09-29T08:55:25.637Z",
    number_of_days: 2,
    __v: 0,
  },
];
```

Response - Fail

```javascript
{
    "Error occured while fetching itinerary"${err.message}
}
```

### Create/Edit Itinerary Form

#### 1. /company/get-themes

- return public + company's private themes !is_deleted
  Request

```javascript
{
}
```

Response - Success

```javascript
[
  {
    _id: "63346a2ad1ed3b337b6d7db0",
    id: "797",
    theme_name: "Ishuu",
    cover_image_url: "https://theme/%2A797%2AIshuu",
    is_deleted: false,
    is_active: false,
    __v: 0,
  },
];
```

Response - Fail

```javascript
{
    "Error occured while fetching themes"${err.message}
}
```

#### 2. /itinerary/create-new

- name, destinations, no. of days, theme in req.body
- set company_id, author_id and timestamp
- set lead_id, customer_id to null
- set type to TEMPLATE
- set mother_itinerary_id = null
- if no. of days available, create days with positive day_index and empty components array
- else create just one day with empty components array
- return itinerary details + days array
  Request

```javascript
{
    "itinerary_name":"Dubai",
    "number_of_days":2,
    "type":"TEMPLATE"
}
```

Response - Success

```javascript
{
    "message": "Itinerary Added Successfully",
    "itineraryDetails": {
        "is_deleted": false,
        "is_active": true,
        "id": 959228,
        "company_id": "63314d60abedf29b6e61e024",
        "type": "Ghumoooo",
        "is_confirmed": false,
        "itinerary_name": "Dubai",
        "destinations": [],
        "days": [],
        "author_id": "633158c25c9a7e90a3d5f7ca",
        "created_utc_timestamp": "2022-09-29T08:55:25.637Z",
        "_id": "63355d7f8a9584e96f51ae54",
        "number_of_days": 2,
        "__v": 0
    },
    "days": [
        {
            "_id": "63355d7f8a9584e96f51ae55",
            "itinerary_id": "63355d7f8a9584e96f51ae54",
            "company_id": "63314d60abedf29b6e61e024",
            "day_index": 1,
            "destinations": [],
            "components": [],
            "__v": 0
        },
        {
            "_id": "63355d7f8a9584e96f51ae58",
            "itinerary_id": "63355d7f8a9584e96f51ae54",
            "company_id": "63314d60abedf29b6e61e024",
            "day_index": 2,
            "destinations": [],
            "components": [],
            "__v": 0
        }
    ]
}
```

Response - Fail

```javascript
{
    "Error occured while adding itinerary"${err.message}
}
```

#### 3. /itinerary/update-details

- update name, destinations, theme
- can't update no. of days (auto-updated on every add/delete day)
- if setting start_date_utc for first time
  - allow only if itinerary.type == PERSONALIZED
  - if there are any **flight** (with a flight_search_params.departure_date_utc)
    - forEach - remove from old day and add to new day with correct calculated date
    - return `itinerary details` and `updated days array with all old and new days`
  - else
    - just update itinerary.start_date
      return itinerary details

#### 4. /itinerary/add-day

- day_index in req body
- create day with day_index, empty components array

#### 5. /itinerary/update-day

- replace components array (in case of changing order of components)

#### 6. /itinerary/add-day-stay

- master_component_id, items_selected, checkin_or_checkout, day_id, time_as_text etc in req body
  > Frontend will call /add-day-stay twice - one for **checkin** and another for **checkout**
- add stay component to current day
- return current day

#### 7. /itinerary/add-day-activity

- master_id, day_id, time_as_text etc in req body
- add activity component to current day
- return current day

#### 8. /itinerary/add-day-transport

- day_id, time_as_text etc in req body
- add transport component to current day
- return current day

#### 9. /itinerary/add-day-flight

- day_id, day_index, flight_search_params, time_as_text etc in req body
- if itinerary has start_date_utc && req.body.flight_search_params has departure_date_utc
  - calculate temporary_date_utc for current day_index :
    `itinerary.start_date + (days between smallest day_index and current day_index)`
  - if flight_search_params.departure_date_utc != temporary_date_utc (i.e. flight has date that don't match with calculated current day_index date)
    - add flight component to the correct day_index.
    - if that day_index doesn't exist, create new day with so day_index and add flight in it
    - return updated_days array with
      1. new day object with day_index and components array
  - else if the dates match
    - add flight to current day_index
    - return updated_days array with
      1. current day object with day_index and components array
- else
  - add flight to current day_index
  - return updated_days array with
    1. current day object with day_index and components array

#### 10. /itinerary/update-day-stay

- req.body.action: UPDATE
  - update specifics from req body
  - return updated component
- req.body.action: DELETE
  - set is_deleted to true
  - remove from itinerary-day.components array
  - return success

#### 7. /itinerary/update-day-activity

- req.body.action: UPDATE
  - update specifics from req body
  - return updated component
- req.body.action: DELETE
  - set is_deleted to true
  - remove from itinerary-day.components array
  - return success

#### 8. /itinerary/update-day-transport

- req.body.action: UPDATE
  - update specifics from req body
  - return updated component
- req.body.action: DELETE
  - set is_deleted to true
  - remove from itinerary-day.components array
  - return success

#### 9. /itinerary/update-day-flight

- req.body.action: UPDATE
  - update specifics from req body
  - update date(s) in flight_search_params
    - if itinerary has start_date_utc
    - add flight component to the new day_index (where calculated date_utc equals flight_search_params.departure_date_utc)
    - remove from current day
    - return updated_days array with
      1. current day object with day_index and components array
      2. new day object with day_index and components array
- req.body.action: DELETE
  - set is_deleted to true
  - remove from itinerary-day.components array
  - return success

### Lead Page

#### 1. /lead/get-details

#### 2. /lead/get-custom-itineraries

- return itineraries where lead_id match

#### 3. /company/get-itineraries

- if destinations array is empty, return all itineraries where lead_id is null (saved itineraries)
- if body contains destinations array, return itineraries where one or more destinations match (match by destination id )

#### 4. /lead/clone-itinerary

- mother_itinerary_id in req body
- clone itinerary details, set mother_itinerary_id
- set type = PERSONALIZED
- clone and link all itinerary days
- clone and link all day components
- if start date in lead details, set start_date_utc for new itinerary

#### 5. /lead/create-new-itinerary

- create itinerary with name = "Customer name's Quick Itinerary from A to B" and theme = 'Generic' (One of the public themes)
- set lead_id and customer_id
- set type = PERSONALIZED
- set mother_itinerary_id = null
- if date range available from lead-details
  - create required itinerary-days with day_index and empty components array
  - calculate and set no. of days
- else if no. of days available in lead details
  - create days with positive day_index and empty components array
  - set no. of days
- else
  - create just one day with positive day-index and empty components array

### Miscellaneous

#### 1. /user/update-last-seen

Request

```javascript
{
}
```

Response - Success

```javascript
{
    "user": {
        "user_info": {
            "email": "ishu@gmail.com",
            "email_verfied": true,
            "display_name": "ISHU"
        },
        "auth_info": {
            "created_utc_timestamp": "2022-09-26T06:57:36.927Z"
        },
        "_id": "63314d60abedf29b6e61e022",
        "provider_id": "1",
        "disabled": false,
        "role": "ADMIN",
        "provider_data": [
            {
                "email": "ishu@gmail.com",
                "providerId": "password",
                "uid": "34",
                "_id": "63314d60abedf29b6e61e023"
            }
        ],
        "active_in_company": true,
        "last_seen": "2022-09-28T10:26:58.328Z",
        "company_id": "63314d60abedf29b6e61e024",
        "__v": 0
    },
    "message": "Last seen updated successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while updating last seen."${err.message}
}
```

#### 1. /user/send-notification

not known

#### 2. lead/add-lead-source

- if user.role == superAdmin, add lead-source with company_id = public make it (lead/add-lead-source-global)
  Request

```javascript
{
    "source":"aaayaaa"
}
```

Response - Success

```javascript
{
  message: "Lead Source Generated Successfully";
}
```

Response - Fail

```javascript
{
    "Error occured while adding lead source."${err.message}
}
```

- if user.role == ADMIN, add lead-source with company_id = company_id
- if user.role == member, deny access
  Request

```javascript
{
    "source":"aaayaaa"
}
```

Response - Success

```javascript
{
  message: "Lead Source Generated Successfully";
}
```

Response - Fail

```javascript
{
    "Error occured while adding lead source."${err.message}
}
```

#### 3. lead/update-lead-source

- if user.role == superAdmin, allow
- if user.role == ADMIN && user.company_id == lead_source.company_id, allow
- if user.role == member, deny access
  Request

```javascript
{
    "source":"aaayaaa"
}
```

Response - Success

```javascript
{
  message: "Lead Source Generated Successfully";
}
```

Response - Fail

```javascript
{
    "Error occured while adding lead source."${err.message}
}
```

- if user.role == ADMIN, add lead-source with company_id = company_id
- if user.role == member, deny access
  Request

```javascript
{
    "source":"jojo",
    "_id":"633191b42e4d316f0c6bb69b"
}
```

Response - Success

```javascript
{
    "message": "Lead Source Updated Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while Updating lead source."${err.message}
}
```

#### 4. /delete-lead-source

- mark is_deleted to true
- if user.role == superAdmin, allow
- if user.role == ADMIN && user.company_id == lead_source.company_id, allow
- if user.role == member, deny access
  Request

```javascript
{
    "_id":"633191b42e4d316f0c6bb69b"
}
```

Response - Success

```javascript
{
    "message": "Lead Source Deleted Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while Deleting lead source."${err.message}
}
```

#### 5. /add-destination

- if user.role == superAdmin, allow
- else deny
- if user.role == member, deny access
  Request

```javascript
{
    "city": "Hisar",
    "state":"Haryana",
    "country":"India",
    "country_code":"+91",
    "timezone":"+5.30"
}
```

Response - Success

```javascript
{
    "message": "Destination Added Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while adding destination."${err.message}
}
```

#### 6. /update-destination

- if user.role == superAdmin, allow
- else deny
- if user.role == member, deny access
  Request

```javascript
{
    "_id":"63317423aab4bfc77acfa8d6",
    "city": "jabalpur",
    "state":"Haryana",
    "country":"India",
    "country_code":"+91",
    "timezone":"+5.30"
}
```

Response - Success

```javascript
{
    "message": "Destination updated Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while updating destination."${err.message}
}
```

#### 7. /delete-destination

- mark is_deleted to true
- if user.role == superAdmin, allow
- else deny
- if user.role == member, deny access
  Request

```javascript
{
    "_id":"633191b42e4d316f0c6bb69b"
}
```

Response - Success

```javascript
{
    "message": "Destination Deleted Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while Deleting destination."${err.message}
}
```

#### 8. itinerary/add-theme

- if user.role == superAdmin, add theme with company_id = public(itinerary/add-theme-global)
- if user.role == member, deny access
  Request

```javascript
{
    "name":"Ishuu",
    "mimetype":"pdf"
}
```

Response - Success

```javascript
{
    "uploadUrl": "https://theme/%2A797%2AIshuu?Content-Type=pdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA27RKLSM2MXLQJKOE%2F20220928%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220928T153714Z&X-Amz-Expires=900&X-Amz-Signature=407bd15f612d5eaa13a81a4429dc09d0b35e7787fc804487d052986f86572413&X-Amz-SignedHeaders=host%3Bx-amz-acl&x-amz-acl=public-read",
    "message": "Theme Added Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while adding theme."${err.message}
}
```

- if user.role == ADMIN, add theme with company_id = company_id
- if user.role == member, deny access
- if user.role == member, deny access
  Request

```javascript
{
    "name":"Ishuu",
    "mimetype":"pdf"
}
```

Response - Success

```javascript
{
    "uploadUrl": "https://theme/%2A797%2AIshuu?Content-Type=pdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA27RKLSM2MXLQJKOE%2F20220928%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220928T153714Z&X-Amz-Expires=900&X-Amz-Signature=407bd15f612d5eaa13a81a4429dc09d0b35e7787fc804487d052986f86572413&X-Amz-SignedHeaders=host%3Bx-amz-acl&x-amz-acl=public-read",
    "message": "Theme Added Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while adding theme."${err.message}
}
```

#### 9. itinerary/update-theme

- if user.role == superAdmin, allow
- if user.role == ADMIN && user.company_id == lead_source.company_id, allow
- if user.role == member, deny access
- if user.role == member, deny access
  Request

```javascript
{
    "_id":"633191b42e4d316f0c6bb69b",
    "theme_name":"hffhdh"
}
```

Response - Success

```javascript
{
    "message": "Theme Updated Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while Deleting lead source."${err.message}
}
```

#### 10. itinerary/delete-theme

- mark is_deleted to true
- if user.role == superAdmin, allow
- if user.role == ADMIN && user.company_id == lead_source.company_id, allow
- if user.role == member, deny access
- if user.role == member, deny access
  Request

```javascript
{
    "_id":"633191b42e4d316f0c6bb69b"
}
```

Response - Success

```javascript
{
    "message": "Theme Deleted Successfully"
}
```

Response - Fail

```javascript
{
    "Error occured while Deleting theme."${err.message}
}












/company/get-details
/company/update-details
/company/get-assets                 search by name
/company/invite-user
/company/get-members
/company/update-user-access             set user.active_in_company
/company/update-user-role               allow only if ADMIN
/company/get-lead-sources
/company/add-lead-source
/company/update-lead-source
/company/
Request-delete-company
/company/delete-company
/company/search-customer

/company
    /add-stay
    /get-stays
    /update-stay
    /delete-stay
    /add-activity
    /get-activities                     search by destinations
    /update-activity
    /delete-activity
    /get-destinations                   search by input


/global/add-lead-source
/global/update-lead-source
/utils/check-whatsapp-number






company/get-leads
company/search-customer             for add lead - to autofill basic details
company/get-destinations
utils/check-whatsapp-number
company/get-lead-sources

lead/update-details
lead/get-itineraries
lead/confirm-itinerary
company/get-itineraries             search by destinations
itinerary/get-details
itinerary/update-details
company/get-stays                    search by destinations
company/get-activities               search by destinations

lead/create-proposal
lead/get-proposals
lead/confirm-proposal               its components will be used for quotes, billing and bookings
lead/send-proposal
lead/create-inquiry                 email html with selected components
company/get-suppliers
lead/send-inquiry                   send inquiry to selected suppliers
lead/get-inquiries

lead/send-message
lead/get-messages                   paginated
lead/send-email
lead/get-emails

```

#### API Routes and actions

1.  /user

        POST /register
            on a new firebase signup, save user data in mongodb
            set active to true
            create default company
            set company_id to firebase auth custom claims
            set company status to active
            set companyIsNew to true

        POST /

    Request-delete-account
    send email to user with a button/link to /delete-user and expiry of 15 minutes

        POST /delete-user
            set disabled to true
            set active_in_company to false
            set deleted_utc_timestamp
            remove from company
            if last member in company, set company status to deleted
            delete user from firebase auth

        POST /update-profile

        POST /get-invites
            [active,
            expired]

        POST /invite-action
            accept
                check expiry
                set status to active
                send acceptance mail to company admins
                link user with new company
                if last member in old company, set company status to deleted
            reject - send rejection mail to company admins, delete invite
            ignore - delete invite

2.  /company

        POST /company/get-details

        POST /get-members
            handle deactivated users case - send status as 'Left'

        POST /update-company-details

        POST /invite-member
            set status to invited
            send invitation email with expiry of 7 days
            add to invites collection

        POST /update-access
            admin
            member
            deactivate
            remove
                remove from company


        POST /

    Request-close-company
    send email to all admins with a button/link to /close-company and expiry of 15 minutes

        POST /delete-company
            remove all members
            set deleted as true
            set deletedTimeStamp

        POST /create-company
            if a user's previous company has been deleted -
            create new company with default name and empty details.
            set company_id to firebase auth custom claims
            set company status to active
            set companyIsNew to true

3.  /itinerary

    POST /create-new
    basic itinerary with name, day count, empty days

    POST /update-day
    if dayIndex exists, replace components array with new one
    if dayIndex doesn't exist, create day with dayIndex and empty components array
    dayIndex can be negative

4.  /company

5.  /lead/itinerary

    POST /clone
    sourceItineraryId
    startDate
    paxCount
    clone itinerary
    clone days
    clone components

    POST /update-component
    active<->draft
    componentDetails
    itineraryLevelDetails
    leadLevelDetails
    bookingLevelDetails

    POST /delete-component

6.  /lead/proposal

    POST /generate
    itineraryId
    proposalName
    ...

    POST /send
    send proposal email
    add proposal sent message to customer chats with publicWebUrl

---

            DATA STRUCTURE

---

1. Reusable Stays
   \_id
   isDeleted
   isActive
   companyId
   type:enum //HOTEL,VILLA,CAMPING,HOSTEL,HOMESTAY
   {data+}
   authorId
   createdOnTimeStamp

2. Reusable Activities
   \_id
   isDeleted
   isActive
   companyId
   type:enum //EXCURSION,SIGHTSEEING,ADVENTURE,HIKING,EVENT
   {data+}
   authorId
   createdOnTimeStamp

3. Transportations
   \_id
   isDeleted
   isActive
   type:enum //TRANSFER,DISPOSAL,BUS,TRAIN
   {data+}
   authorId
   createdOnTimeStamp

4. Flights

5. Itineraries
   \_id
   parentItineraryId
   company_id
   type:enum //REUSABLE,CUSTOM
   leadId //null if type==REUSABLE
   customerId //null if type==REUSABLE
   isConfirmed //always null if type==REUSABLE
   itineraryName
   destinationsArray
   themeId
   isDeleted
   isActive
   noOfDays
   noOfNights
   authorId
   createdOnTimeStamp

6. Days
   \_id
   day // helps sorting days in an itinerary and define their date
   company_id
   itineraryId
   components:[]
   type:enum //STAY-CIN,STAY-COUT,ACTIVITY,TRANSPORTATION,FLIGHT
   id

7. Itinerary Components
   \_id
   company_id
   itineraryId
   dayId
   parentComponentId
   type:enum //STAY-CIN,STAY-COUT,ACTIVITY,TRANSPORTATION,FLIGHT
   authorId
   createdOnTimeStamp
   isDeleted
   isActive
   timeAsText //default "--"
   isPrivateTransfer //useful if TRANSPORTAION.type==TRANSFER

   // lead level details, null until updated
   leadId
   customerId
   startTimeAsText
   services:[]
   {serviceDataObject+}
   estimatedCostPrice
   actualCostPrice //null until updated
   totalEstimatedCostPrice
   isCancelled
   // booking level details, null until updated
   actualCostPrice
   {bookingData+}

8. Lead
   \_id
   customerId
   customerDetails:{}
   name
   email
   phoneNo
   whatsappNo
   pax:{}
   adultCount
   childCount
   infantCount
   notes:[]
   \_id
   message
   authorId
   createdOnTimeStamp
   status:enum // NEW,PROPOSAL SENT,ITINERARY CONFIRMED, CLOSED WON,CLOSED LOST,
   isPriority
   isUsingApp
   requirementsArray
   travelDates:{}
   startDate
   endDate
   leadSource
   assignedTo
   authorId
   createdOnTimeStamp

9. Proposals
   \_id
   proposalName
   leadId
   customerId
   itineraryId
   status:enum //DRAFT,SENT
   senderId
   sentTimeStamp
   isConfirmed
   salePrice
   generatedEmailHtml
   generatedWebHtml
   publicWebUrl
   authorId
   createdOnTimeStamp

10. Supplier Messages
    \_id
    senderId
    senderName
    sentTimeStamp
    leadId
    customerId
    itineraryId
    components:[]
    date
    {componentData+}
    supplier:{}
    id
    email
    name
    generatedEmailHtml
    status:enum //PENDING,SENT
    receivedQuotePrice

11. Customer messages
    \_id
    senderId
    senderName
    sentTimeStamp
    messageText
    attachmentType:enum //NONE,WEBURL,MEDIA
    buttonText
    webUrl
    media:{}
    mimeType
    storageUrl

12. Lead Logs:[]
    \_id
    leadId
    type:enum //TBD
    logTitle
    logDescription
    isVisibleInApp
    context:{}
    componentType
    componentId
    authorId
    createdOnTimeStamp

---

Whenever a new user is created, firebase sends a post
Request to https://ekz9x6fpt6.execute-api.ap-south-1.amazonaws.com/dev/api/user/register with user object in
Request body to be saved into Mongo DB

SETUP =======>
[

1. cd application
2. local enviornment Start process =>
   a. npm i,
   b. uncomment - plugin serverless -offline in serverless.yml and run npm i serverless-offline@8.7.0 -D
3. npm run local
   ]

Output screen like ====> Server ready: http://localhost:3000 🚀

API==========> all formats are in json ==> All api need token in headers.
endpoint initial ===> http://localhost:3000/dev/api/ {NOT FOR FRONTEND}

1. (Register) EndPoint => post(user/register)

Request(body) =>
{
"uid":"34",
"email":"ishu@gmail.com",
"emailVerified":true,
"displayName":"ISHU",
"phone_number":9896662867,
"deactivated":false,
"providerData": [{"email":"ishu@gmail.com","providerId":"password","uid":"34"}]
}

Response ==>
{
"message": "User Added Successfully"
}

2. (invites) === > 1st api on dashboard to show how many invites the person have if not ignore this means in case of []

======>
endpoint ==> get(user/invites)

res => 1. In case no invites are there ===> [] 2.
[
{
"_id": "6315a61e2d84d686e97d5500",
"email": "ishu@gmail.com",
"phone_number": 9896662867,
"role": "ADMIN",
"company_id": "630c43ede87a4d7c2a57cb92",
"business_name": "Hansraj's org",
"name": "ISHU",
"created_utc_timestamp": "2022-09-05T07:32:46.463Z",
"__v": 0
}
]

3. (sending invite) EndPoint => post(user/invite)

Request(body) =>
{
"name":"ISHU",
"phone_number":9896662867,
"email":"ishu@gmail.com",
"role":"ADMIN"
}

Response ==>
{
"message": "Invite Sent Successfully"
}

4.  (Accept invite) EndPoint => put(user/update)

Request(body) =>
{
"\_id":"23443234343"(invite \_id which get accepted),
"action":"Accepted"
}

Response ==>
{
"message": "Accepted Successfully"
}

5. (Decline invite) EndPoint => put(user/update)

Request(body) =>
{
"\_id":"23443234343"(invite \_id which get declined),
"action":"Declined"
}

Response ==>
{
"message": "Declined Successfully"
}

6.(USER PROFILE) Endpoint ==> get(user/get-profile)

res ==>
{
"user_info": {
"email": "ishu@gmail.com",
"email_verfied": true,
"display_name": "ISHU",
"phone_number": 9896662867
},
"auth_info": {
"created_utc_timestamp": "2022-09-05T07:21:11.877Z"
},
"\_id": "6315a3671ff71ef88dca8bf3",
"provider_id": "34",
"deactivated": false,
"role": "ADMIN",
"provider_data": [
{
"email": "ishu@gmail.com",
"providerId": "password",
"uid": "34",
"_id": "6315a3671ff71ef88dca8bf4"
}
],
"active": true,
"invitation_accepted": false,
"last_seen": "2022-09-05T07:21:10.455Z",
"company_id": "6315a3671ff71ef88dca8bf5",
"\_\_v": 0
}

7. (Update Profile) EndPoint ==> put(user/update-profile)

Request(body) =>
{
"name":"Ishant Pasricha",
"phone_number":9896662867,
"photoUrl":{
"name":"file",
"mimetype":"pdf"
}
}

Note :- If photo url not there to change then only response is === >{"message": "User Details updated Successfully"}

Response ==>
{
"uploadUrlList": [
{
"photoUploadUrl": "https://user-profile/6315a3671ff71ef88dca8bf3/%2A104%2Afile?Content-Type=pdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA27RKLSM2MXLQJKOE%2F20220905%2Fap-south-1%2Fs3%2Faws4_
Request&X-Amz-Date=20220905T075002Z&X-Amz-Expires=900&X-Amz-Signature=911f373e1be62aeaf022af5f30907573c8762ffc0bdb3eedcaf9748c7bbeb437&X-Amz-SignedHeaders=host%3Bx-amz-acl&x-amz-acl=public-read"
}
],
"message": "User Details updated Successfully"
}

On this upload the profile pic.

8. (Last seen) EndPoint => put(user/update-last_seen)

Response ==>
{
"message": "Last seen updated successfully"
}

9. (Update Role) EndPoint => put(user/update-role)

Req ==>
{
"\_id":"2345432"(\_id of member whose role want to update),
"role":"ADMIN" || "orgMember"
}

Response ==>
{
message: "Role updated Successfully"
}

10.(Deactivate USER) EndPoint => put(user/deactivate-user)

Req ==>
{
"\_id":"2345432"(\_id of member which admin want to deactivate),
}

Response ==>
{ message: "Updated Successfully" }

11.(Activate USER) EndPoint => put(user/deactivate-user)

Req ==>
{
"\_id":"2345432"(\_id of member which admin want to activate),
}

Response ==>
{ message: "Updated Successfully" }

11.(Delete USER) EndPoint => delete(user/delete/(\_id of user which admin want to delete))

Response ==>
{ message: "Deleted Successfully" }

12. (Get Comapny Details) === > EndPoint => put(user/get-company-details)

Response === >

{
"primary_contact": {
"name": "ISHU",
"email": "ishu@gmail.com",
"phone_number": "9896662867"
},
"\_id": "6315a3671ff71ef88dca8bf5",
"business_name": "ISHU's org",
"active": true,
"assets": [],
"\_\_v": 0
}

13. (Update Comapny Details) === > EndPoint => put(user/update-company)

Request === >
{
"id":"63142b0c7f85820e2a60a376",(comapny \_id)
"business_name":"KAMAL KI COMPANY",
"line1":"123432 plot",
"line2":"cholaa ram k pass",
"city":"karnal",
"state":"haryana",
"zipcode":"132001",
"country":"INDIA",
"pan_number":"HHJSIhd",
"tan_number":"453",
"gstin_number":"23443",
"name":"kamal",
"email":"kamal@gmail.com",
"phone_number":"6473802320"

},

Response =>

{message:"Successfully updated company details"}

if( logo is there)

req ===>
{
"\_id":"63142b0c7f85820e2a60a376",
"logo":{
"name":"Ishu",
"mimetype":"pdf"
}
}

response ===>
{
"uploadUrlList": [
{
"company_logo": "https://comapny-profile/63142b0c7f85820e2a60a376/%2A135%2AIshu?Content-Type=pdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA27RKLSM2MXLQJKOE%2F20220905%2Fap-south-1%2Fs3%2Faws4_
Request&X-Amz-Date=20220905T081439Z&X-Amz-Expires=900&X-Amz-Signature=dd6437b968ec78197bc7381907b6e618b29e53e0aeb12e36b7d20ebf7ab1295d&X-Amz-SignedHeaders=host%3Bx-amz-acl&x-amz-acl=public-read"
}
],
"message": "Successfully updated company details"
}

13. (Assets Managment) ===> EndPoint => put(user/update-company)

Request === >
{
"\_id":"63142b0c7f85820e2a60a376",
"assets":[
{
"name":"Ishu",
"mimetype":"pdf",
"type":"1080X1233",
"size":"234kb"
}
]
}

response == >
{
"uploadUrlList": [
{
"company_logo": "https://comapny-profile/63142b0c7f85820e2a60a376/%2A135%2AIshu?Content-Type=pdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA27RKLSM2MXLQJKOE%2F20220905%2Fap-south-1%2Fs3%2Faws4_
Request&X-Amz-Date=20220905T081439Z&X-Amz-Expires=900&X-Amz-Signature=dd6437b968ec78197bc7381907b6e618b29e53e0aeb12e36b7d20ebf7ab1295d&X-Amz-SignedHeaders=host%3Bx-amz-acl&x-amz-acl=public-read"
}
],
"message": "Successfully updated company details"
}

14. (GET Company Members) --- > End Point (/user/get-company-members)

response--->
[
{
"\_id": "6315a3671ff71ef88dca8bf5",
"business_name": "ISHU's org",
"primary_contact": {
"name": "ISHU",
"email": "ishu@gmail.com",
"phone_number": "9896662867"
},
"active": true,
"assets": [],
"**v": 0,
"invitation": [
{
"\_id": "6315b7360f306a103a5be6b4",
"email": "ishu_g@gmail.com",
"phone_number": 9896662867,
"role": "ADMIN",
"company_id": "6315a3671ff71ef88dca8bf5",
"business_name": "ISHU's org",
"name": "ISHU",
"created_utc_timestamp": "2022-09-05T08:45:42.593Z",
"**v": 0
}
],
"users": [
{
"\_id": "6315a3671ff71ef88dca8bf3",
"provider_id": "34",
"user_info": {
"email": "ishu@gmail.com",
"email_verfied": true,
"display_name": "Ishant Pasricha",
"phone_number": 9896662867
},
"auth_info": {
"created_utc_timestamp": "2022-09-05T07:21:11.877Z"
},
"deactivated": false,
"role": "ADMIN",
"provider_data": [
{
"email": "ishu@gmail.com",
"providerId": "password",
"uid": "34",
"_id": "6315a3671ff71ef88dca8bf4"
}
],
"active": true,
"invitation_accepted": false,
"last_seen": "2022-09-05T07:21:10.455Z",
"company_id": "6315a3671ff71ef88dca8bf5",
"\_\_v": 0
}
]
}
]

15. (GET Members Name) --- > End Point (/leads/get-members)

response===>

[
{
"user_info": {
"display_name": "Kamal"
},
"_id": "63142b0c7f85820e2a60a374"
},
{
"user_info": {
"display_name": "Sanjay Kumar"
},
"_id": "63146b2c135f776c26434f29"
}
]

16. (Post Add-lead-source-global) =========> EndPoint(/leads/add-lead-source-global)

Request ====> {"source":"Whatsapp"},
response======>
{
"message": "Lead Source Generated Successfully"
}

17 (Post Add-lead-source) =========> EndPoint(/leads/add-lead-source)

Request ====> {"source":"Whatsapp"},
response======>
{
"message": "Lead Source Generated Successfully"
}

18 (Get Get-lead-source) =========> EndPoint(/leads/get-lead-source)

response======>
[
{
"_id": "631a01c29fa895d7b9d4e6e0",
"source": "Facebook",
"__v": 0
},
{
"_id": "631a01d604538044d8c2e142",
"source": "Whatsapp",
"__v": 0
},
{
"_id": "631a01f23f8a1a4e8eedb2da",
"source": "lead-source 1",
"__v": 0
},
{
"_id": "631a0221b3c000f74d9164a4",
"source": "lead-source by company 1",
"company_id": "63142b0c7f85820e2a60a376",
"__v": 0
}
]

19.(Post --- Generate Lead) ===> Endpoint(/leads/add-lead) ===>

Request =>
{
"customer_name":"ISHANT",
"lead_source":"Facebook",
"from_date":"2022-06-09T09:47:10.000+00:00",
"to_date":"2022-06-18T09:47:10.000+00:00",
"adult":2,
"child":5,
"infant":10,
"assignee":"Sanjay",
"lead_type":"High Priority",
"email":"zingur@gmail.com",
"destinations":[
{
"city":"karnal",
"state":"haryana",
"country":"India",
"timezone":"+5:30",
"country_code":"+91"
},
{
"city":"ynr",
"state":"haryana",
"country":"India",
"timezone":"+5:30",
"country_code":"+91"
}
],
"requirements":["Flight","Visa","Full trip"],
"whatsapp":true,
"whatsapp_number":9896662867
}

response ===>

{
"message": "Lead Generated Successfully"
}

20. (Get All Lead) Endpoint =====> (/leads/)

response =>
[
{
"travel_date": {
"from_date": "2022-06-09T09:47:10.000Z",
"to_date": "2022-06-18T09:47:10.000Z"
},
"pax": {
"adult": 1,
"child": 5,
"infant": 10
},
"\_id": "631a0703f052027f86137c9b",
"lead_id": "364910",
"company_id": "63142b0c7f85820e2a60a376",
"status": "New Lead",
"customer_name": "ISHANT",
"lead_source": "Facebook",
"assignee": "Sanjay",
"on_app": false,
"lead_type": "High Priority",
"email": "zingur@gmail.com",
"requirements": [
{
"type": "Flight",
"_id": "631a0703f052027f86137c9d"
}
],
"destinations": [
{
"city": "karnal",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631a0703f052027f86137c9c"
}
],
"whatsapp_number": 9896662867,
"phone_number": 9896662867,
"**v": 0
},
{
"travel_date": {
"from_date": "2022-06-09T09:47:10.000Z",
"to_date": "2022-06-10T09:47:10.000Z"
},
"pax": {
"adult": 1,
"child": 0,
"infant": 0
},
"\_id": "631a07e7d01b85b013f6e02d",
"lead_id": "295989",
"company_id": "63142b0c7f85820e2a60a376",
"status": "New Lead",
"customer_name": "Hansraj",
"lead_source": "Whatsapp",
"assignee": "IShant Kumar",
"on_app": false,
"lead_type": "Standard",
"email": "ishu@gmail.com",
"requirements": [
{
"type": "Full trip",
"_id": "631a07e7d01b85b013f6e02f"
}
],
"destinations": [
{
"city": "karnal",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631a07e7d01b85b013f6e02e"
}
],
"whatsapp_number": 9896662867,
"phone_number": 989393929092,
"**v": 0
},
{
"travel_date": {
"from_date": "2022-06-09T09:47:10.000Z",
"to_date": "2022-06-10T09:47:10.000Z"
},
"pax": {
"adult": 1,
"child": 0,
"infant": 0
},
"\_id": "631a0cd760ea10af3919e133",
"lead_id": "178158",
"company_id": "63142b0c7f85820e2a60a376",
"status": "New Lead",
"customer_name": "Hansraj",
"lead_source": "Whatsapp",
"assignee": "IShant Kumar",
"on_app": false,
"lead_type": "Standard",
"email": "ishu@gmail.com",
"requirements": [
{
"type": "Full trip",
"_id": "631a0cd760ea10af3919e137"
},
{
"type": "Visa",
"_id": "631a0cd760ea10af3919e138"
},
{
"type": "Card",
"_id": "631a0cd760ea10af3919e139"
}
],
"destinations": [
{
"city": "zika",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631a0cd760ea10af3919e134"
},
{
"city": "zika",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631a0cd760ea10af3919e135"
},
{
"city": "zika",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631a0cd760ea10af3919e136"
}
],
"whatsapp_number": 9896662867,
"phone_number": 989393929092,
"\_\_v": 0
}
]

21.put call Removing the Elements from lead array ==> Endpoint(/leads/remove)

Request =>
{
"parent_id":"631a0cd760ea10af3919e133",
"child_id":"631a0cd760ea10af3919e137",
"requirements":true
}

response=>
{message:"Instance deleted successfully"};

22. put call if remove from destinations ===> Endpoint(/leads/remove)

Request ==
{
"parent_id":"631a0cd760ea10af3919e133",
"child_id":"631a0cd760ea10af3919e137",
"destinations":true
}

response =>
{message:"Instance deleted successfully"};

23. put update lead (/leads/update-leads)

Request====>
{
"lead_id":"631aae98d5aebee93dfdb512",
"status":"Proposal Sent",
"customer_name":"Bauuuji",
"destinations": [
{
"city": "karnal",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30"
},
{
"city": "ynr",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30"
}
]
}

response ==>
{{
"message": "Lead Updated Successfully",
"data": {
"travel_date": {
"from_date": "2022-06-09T09:47:10.000Z",
"to_date": "2022-06-18T09:47:10.000Z"
},
"pax": {
"adult": 1,
"child": 5,
"infant": 10
},
"\_id": "631aae98d5aebee93dfdb512",
"lead_id": "898591",
"company_id": "63142b0c7f85820e2a60a376",
"status": "Proposal Sent",
"customer_name": "Bauuuji",
"lead_source": "Facebook",
"assignee": "Sanjay",
"on_app": false,
"lead_type": "High Priority",
"email": "zingur@gmail.com",
"requirements": [
{
"type": "Flight",
"_id": "631aae98d5aebee93dfdb515"
},
{
"type": "Visa",
"_id": "631aae98d5aebee93dfdb516"
},
{
"type": "Full trip",
"_id": "631aae98d5aebee93dfdb517"
}
],
"destinations": [
{
"city": "karnal",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631aae98d5aebee93dfdb513"
},
{
"city": "ynr",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631aae98d5aebee93dfdb514"
},
{
"city": "karnal",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631ab60e6efb1b8103d1b647"
},
{
"city": "ynr",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631ab60e6efb1b8103d1b648"
},
{
"city": "karnal",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631de977fec58ab0e3456065"
},
{
"city": "ynr",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631de977fec58ab0e3456066"
}
],
"whatsapp_number": 9896662867,
"phone_number": 9896662867,
"\_\_v": 2
}
}

24.Delete lead Endpoint(/leads/delete/630c439e5e314dd63b912955)

response ===>
{ message: "Deleted Successfully" }

25. Add itinerary Endpoint (/itinerary/add-itinerary)

Request ===>
{
"itinerary_name":"DUBAI TOUR",
"theme_name":"ISHU",
"theme_url":"https://dheuedcom",
"days":10,
"destinations": [
{
"city": "karnal",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631aae98d5aebee93dfdb513"
},
{
"city": "ynr",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30"
},
{
"city": "karnal",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30"
},
{
"city": "ynr",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30"
}
]
}

response ====>
{
"message": "itinerary Added Successfully"
}

26. get itinerary All ===> (/itinerary/get-itinerary)

response ===>
[
{
"theme": {
"theme_name": "ISHU",
"theme_url": "https://dheuedcom"
},
"days_count": {
"days": 10,
"nights": 10
},
"\_id": "631ab8a3334b646ea25df6ec",
"itinerary_name": "Dubai Tour",
"itinerary_id": "466989",
"company_id": "63142b0c7f85820e2a60a376",
"destinations": [
{
"city": "karnal",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631ab8a3334b646ea25df6ed"
},
{
"city": "ynr",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631ab8a3334b646ea25df6ee"
},
{
"city": "karnal",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631ab8a3334b646ea25df6ef"
},
{
"city": "ynr",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631ab8a3334b646ea25df6f0"
}
],
"**v": 3,
"days": [
"631c18ab7065b6048804f9b1",
"631c192472ab1c02a36c9d2c"
]
},
{
"theme": {
"theme_name": "ISHU",
"theme_url": "https://dheuedcom"
},
"days_count": {
"days": 10,
"nights": 10
},
"\_id": "631dea80144675f2bc1919f9",
"itinerary_name": "DUBAI TOUR",
"itinerary_id": "951787",
"company_id": "63142b0c7f85820e2a60a376",
"days": [],
"destinations": [
{
"city": "karnal",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631dea80144675f2bc1919fa"
},
{
"city": "ynr",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631dea80144675f2bc1919fb"
},
{
"city": "karnal",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631dea80144675f2bc1919fc"
},
{
"city": "ynr",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631dea80144675f2bc1919fd"
}
],
"**v": 0
}
]

27. Update itinerary ====> (/leads/update-itinerary)

Request ===>

{
"\_id":"631ab8a3334b646ea25df6ec",
"itinerary_name":"Dubai Tour"
}

response ===>
{
"message": "itinerary Updated Successfully",
"data": {
"theme": {
"theme_name": "ISHU",
"theme_url": "https://dheuedcom"
},
"days_count": {
"days": 10,
"nights": 10
},
"\_id": "631ab8a3334b646ea25df6ec",
"itinerary_name": "Dubai Tour",
"itinerary_id": "466989",
"company_id": "63142b0c7f85820e2a60a376",
"destinations": [
{
"city": "karnal",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631ab8a3334b646ea25df6ed"
},
{
"city": "ynr",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631ab8a3334b646ea25df6ee"
},
{
"city": "karnal",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631ab8a3334b646ea25df6ef"
},
{
"city": "ynr",
"state": "haryana",
"country": "India",
"country_code": "+91",
"timezone": "+5:30",
"_id": "631ab8a3334b646ea25df6f0"
}
],
"\_\_v": 3,
"days": [
"631c18ab7065b6048804f9b1",
"631c192472ab1c02a36c9d2c"
]
}
}

28. Add theme (/leads/add-theme-global)

Request ==>
{
"name":"Ishuu",
"mimetype":"pdf"
}

response ==>

{
"uploadUrl": "https://theme/%2A609%2AIshuu?Content-Type=pdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA27RKLSM2MXLQJKOE%2F20220911%2Fap-south-1%2Fs3%2Faws4\_
Request&X-Amz-Date=20220911T140721Z&X-Amz-Expires=900&X-Amz-Signature=5a2aa3e6f2164c01e159ab4f7896a1e18ca81d5f67bb4cafa58d7cd0fd0ba0f6&X-Amz-SignedHeaders=host%3Bx-amz-acl&x-amz-acl=public-read",
"message": "Theme Added Successfully"
}

29 add theme comapny own (/leads/add-theme)

Request ==>
{
"name":"Ishuu",
"mimetype":"pdf"
}

response ==>

{
"uploadUrl": "https://theme/%2A609%2AIshuu?Content-Type=pdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA27RKLSM2MXLQJKOE%2F20220911%2Fap-south-1%2Fs3%2Faws4\_
Request&X-Amz-Date=20220911T140721Z&X-Amz-Expires=900&X-Amz-Signature=5a2aa3e6f2164c01e159ab4f7896a1e18ca81d5f67bb4cafa58d7cd0fd0ba0f6&X-Amz-SignedHeaders=host%3Bx-amz-acl&x-amz-acl=public-read",
"message": "Theme Added Successfully"
}

29 Get theme (/leads/get-theme)

response ===>
[
{
"_id": "631abfb15400a814b31688e1",
"theme_name": "Ishuu",
"theme_url": "https://theme/%2A30%2AIshuu",
"__v": 0
},
{
"_id": "631deb994b4af6b4c3127e72",
"theme_name": "Ishuu",
"theme_url": "https://theme/%2A609%2AIshuu",
"__v": 0
}
]

30. Add activity post(/itinerary/add-activity)

Request ===>
{
"type":"SightSeen",
"activity_name":"Dubai",
"address":"12 tuti chonk",
"description":"Kteega teraaa",
"theme_name":"ishant",
"mimetype":"pdf",
"notes":["ghummo"]
}

response===>
{ message: "Activity Added Successfully" }

31. Add stay post(/itinerary/add-stay)

Request ===>
{
"type":"Vilaaa",
"stay_name":"Jagmohan vilaaaa",
"address":"Duabi 12 tuti chonk k pass",
"destination_place":"Dubai",
"theme_name":"ishant",
"mimetype":"pdf",
"notes":["ghummo","firooo"]
}

response===>
{ message: "Stay Added Successfully" }

32. Add Day (per day m vo ky kreega) ===>

post ==> (/leads/add-day)

Request ===>
{
"\_id":"631ab8a3334b646ea25df6ec",
"day":2,
"components":[
{
"id":"631b498a86114efb8defd7c0",
"type":"Stay",
"dataCheckIn":{"time":"10.30"},
"dataCheckOut":{"time":"10.30"}
},
{
"id":"631b499b709b18eb01ba99ec",
"type":"transport",
"dataDuration":{"time:":"10 min"}
},
{
"id":"631b495b7538199dc3c777b0",
"type":"activity",
"dataDuration":{"time:":"4 hr","kheloo":56789}
}
]
}

response ===>

{
"message": "Day Information Added Successfully"
}

33. get -day output (/leads/get-day/get-day/631ab8a3334b646ea25df6ec)

response ===>
[
{
"\_id": "631c18ab7065b6048804f9b1",
"itinerary_id": "631ab8a3334b646ea25df6ec",
"day": 1,
"components": {
"id": "631b498a86114efb8defd7c0",
"type": "Stay",
"data": {
"time": "10.30"
},
"\_id": "631c18ab7065b6048804f9b2"
},
"**v": 0,
"stays": {
"\_id": "631b498a86114efb8defd7c0",
"type": "3 star Hotel",
"id": "423379",
"stay_name": "Hotel Anaaa",
"address": "Duabi 13 khabams",
"company_id": "63142b0c7f85820e2a60a376",
"theme": {
"theme_name": "ishant",
"theme_url": "https://stays/theme/%2A413%2Aishant"
},
"destination_place": "Dubai",
"live": true,
"notes": [
{
"note": "ghummo",
"_id": "631b498a86114efb8defd7c1"
},
{
"note": "firooo",
"_id": "631b498a86114efb8defd7c2"
}
],
"**v": 0
}
},
{
"\_id": "631c18ab7065b6048804f9b1",
"itinerary_id": "631ab8a3334b646ea25df6ec",
"day": 1,
"components": {
"id": "631b498a86114efb8defd7c0",
"type": "Stay",
"data": {
"time": "10.30"
},
"\_id": "631c18ab7065b6048804f9b3"
},
"**v": 0,
"stays": {
"\_id": "631b498a86114efb8defd7c0",
"type": "3 star Hotel",
"id": "423379",
"stay_name": "Hotel Anaaa",
"address": "Duabi 13 khabams",
"company_id": "63142b0c7f85820e2a60a376",
"theme": {
"theme_name": "ishant",
"theme_url": "https://stays/theme/%2A413%2Aishant"
},
"destination_place": "Dubai",
"live": true,
"notes": [
{
"note": "ghummo",
"_id": "631b498a86114efb8defd7c1"
},
{
"note": "firooo",
"_id": "631b498a86114efb8defd7c2"
}
],
"**v": 0
}
},
{
"\_id": "631c18ab7065b6048804f9b1",
"itinerary_id": "631ab8a3334b646ea25df6ec",
"day": 1,
"components": {
"id": "631b499b709b18eb01ba99ec",
"type": "transport",
"data": {
"time:": "10 min"
},
"\_id": "631c18ab7065b6048804f9b4"
},
"**v": 0,
"transportations": {
"\_id": "631b499b709b18eb01ba99ec",
"id": "662665",
"private_transfer": true,
"trans_type": "Private vehicle",
"pick_location": "Gud Mandi",
"drop_location": "12 khambdaaa",
"vehicle_type": "Bus",
"theme": {
"theme_name": "ishant",
"theme_url": "https://transportations/theme/%2A468%2Aishant"
},
"company_id": "63142b0c7f85820e2a60a376",
"live": true,
"notes": [
{
"note": "ghummo",
"_id": "631b499b709b18eb01ba99ed"
},
{
"note": "firooo",
"_id": "631b499b709b18eb01ba99ee"
}
],
"**v": 0
}
},
{
"\_id": "631c18ab7065b6048804f9b1",
"itinerary_id": "631ab8a3334b646ea25df6ec",
"day": 1,
"components": {
"id": "631b495b7538199dc3c777b0",
"type": "activity",
"data": {
"time:": "4 hr"
},
"\_id": "631c18ab7065b6048804f9b5"
},
"**v": 0,
"activities": {
"\_id": "631b495b7538199dc3c777b0",
"type": "Excursion",
"theme": {
"theme_name": "ishant",
"theme_url": "https://activites/theme/%2A377%2Aishant"
},
"id": "969555",
"activity_name": "Ghumo Dubai",
"description": "Kteega",
"address": "12 khambaaa",
"live": true,
"company_id": "63142b0c7f85820e2a60a376",
"notes": [
{
"note": "Backchodiii",
"_id": "631b495b7538199dc3c777b1"
},
{
"note": "ghummo",
"_id": "631b495b7538199dc3c777b2"
}
],
"**v": 0
}
},
{
"\_id": "631c192472ab1c02a36c9d2c",
"itinerary_id": "631ab8a3334b646ea25df6ec",
"day": 2,
"components": {
"id": "631b498a86114efb8defd7c0",
"type": "Stay",
"data": {
"time": "10.30"
},
"\_id": "631c192472ab1c02a36c9d2d"
},
"**v": 0,
"stays": {
"\_id": "631b498a86114efb8defd7c0",
"type": "3 star Hotel",
"id": "423379",
"stay_name": "Hotel Anaaa",
"address": "Duabi 13 khabams",
"company_id": "63142b0c7f85820e2a60a376",
"theme": {
"theme_name": "ishant",
"theme_url": "https://stays/theme/%2A413%2Aishant"
},
"destination_place": "Dubai",
"live": true,
"notes": [
{
"note": "ghummo",
"_id": "631b498a86114efb8defd7c1"
},
{
"note": "firooo",
"_id": "631b498a86114efb8defd7c2"
}
],
"**v": 0
}
},
{
"\_id": "631c192472ab1c02a36c9d2c",
"itinerary_id": "631ab8a3334b646ea25df6ec",
"day": 2,
"components": {
"id": "631b498a86114efb8defd7c0",
"type": "Stay",
"data": {
"time": "10.30"
},
"\_id": "631c192472ab1c02a36c9d2e"
},
"**v": 0,
"stays": {
"\_id": "631b498a86114efb8defd7c0",
"type": "3 star Hotel",
"id": "423379",
"stay_name": "Hotel Anaaa",
"address": "Duabi 13 khabams",
"company_id": "63142b0c7f85820e2a60a376",
"theme": {
"theme_name": "ishant",
"theme_url": "https://stays/theme/%2A413%2Aishant"
},
"destination_place": "Dubai",
"live": true,
"notes": [
{
"note": "ghummo",
"_id": "631b498a86114efb8defd7c1"
},
{
"note": "firooo",
"_id": "631b498a86114efb8defd7c2"
}
],
"**v": 0
}
},
{
"\_id": "631c192472ab1c02a36c9d2c",
"itinerary_id": "631ab8a3334b646ea25df6ec",
"day": 2,
"components": {
"id": "631b499b709b18eb01ba99ec",
"type": "transport",
"data": {
"time:": "10 min"
},
"\_id": "631c192472ab1c02a36c9d2f"
},
"**v": 0,
"transportations": {
"\_id": "631b499b709b18eb01ba99ec",
"id": "662665",
"private_transfer": true,
"trans_type": "Private vehicle",
"pick_location": "Gud Mandi",
"drop_location": "12 khambdaaa",
"vehicle_type": "Bus",
"theme": {
"theme_name": "ishant",
"theme_url": "https://transportations/theme/%2A468%2Aishant"
},
"company_id": "63142b0c7f85820e2a60a376",
"live": true,
"notes": [
{
"note": "ghummo",
"_id": "631b499b709b18eb01ba99ed"
},
{
"note": "firooo",
"_id": "631b499b709b18eb01ba99ee"
}
],
"**v": 0
}
},
{
"\_id": "631c192472ab1c02a36c9d2c",
"itinerary_id": "631ab8a3334b646ea25df6ec",
"day": 2,
"components": {
"id": "631b495b7538199dc3c777b0",
"type": "activity",
"data": {
"time:": "4 hr",
"kheloo": 56789
},
"\_id": "631c192472ab1c02a36c9d30"
},
"**v": 0,
"activities": {
"\_id": "631b495b7538199dc3c777b0",
"type": "Excursion",
"theme": {
"theme_name": "ishant",
"theme_url": "https://activites/theme/%2A377%2Aishant"
},
"id": "969555",
"activity_name": "Ghumo Dubai",
"description": "Kteega",
"address": "12 khambaaa",
"live": true,
"company_id": "63142b0c7f85820e2a60a376",
"notes": [
{
"note": "Backchodiii",
"_id": "631b495b7538199dc3c777b1"
},
{
"note": "ghummo",
"_id": "631b495b7538199dc3c777b2"
}
],
"**v": 0
}
},
{
"\_id": "631ded28544d89302f86bade",
"itinerary_id": "631ab8a3334b646ea25df6ec",
"day": 2,
"components": {
"id": "631b498a86114efb8defd7c0",
"type": "Stay",
"data": {
"time": "10.30"
},
"\_id": "631ded28544d89302f86badf"
},
"**v": 0,
"stays": {
"\_id": "631b498a86114efb8defd7c0",
"type": "3 star Hotel",
"id": "423379",
"stay_name": "Hotel Anaaa",
"address": "Duabi 13 khabams",
"company_id": "63142b0c7f85820e2a60a376",
"theme": {
"theme_name": "ishant",
"theme_url": "https://stays/theme/%2A413%2Aishant"
},
"destination_place": "Dubai",
"live": true,
"notes": [
{
"note": "ghummo",
"_id": "631b498a86114efb8defd7c1"
},
{
"note": "firooo",
"_id": "631b498a86114efb8defd7c2"
}
],
"**v": 0
}
},
{
"\_id": "631ded28544d89302f86bade",
"itinerary_id": "631ab8a3334b646ea25df6ec",
"day": 2,
"components": {
"id": "631b498a86114efb8defd7c0",
"type": "Stay",
"data": {
"time": "10.30"
},
"\_id": "631ded28544d89302f86bae0"
},
"**v": 0,
"stays": {
"\_id": "631b498a86114efb8defd7c0",
"type": "3 star Hotel",
"id": "423379",
"stay_name": "Hotel Anaaa",
"address": "Duabi 13 khabams",
"company_id": "63142b0c7f85820e2a60a376",
"theme": {
"theme_name": "ishant",
"theme_url": "https://stays/theme/%2A413%2Aishant"
},
"destination_place": "Dubai",
"live": true,
"notes": [
{
"note": "ghummo",
"_id": "631b498a86114efb8defd7c1"
},
{
"note": "firooo",
"_id": "631b498a86114efb8defd7c2"
}
],
"**v": 0
}
},
{
"\_id": "631ded28544d89302f86bade",
"itinerary_id": "631ab8a3334b646ea25df6ec",
"day": 2,
"components": {
"id": "631b499b709b18eb01ba99ec",
"type": "transport",
"data": {
"time:": "10 min"
},
"\_id": "631ded28544d89302f86bae1"
},
"**v": 0,
"transportations": {
"\_id": "631b499b709b18eb01ba99ec",
"id": "662665",
"private_transfer": true,
"trans_type": "Private vehicle",
"pick_location": "Gud Mandi",
"drop_location": "12 khambdaaa",
"vehicle_type": "Bus",
"theme": {
"theme_name": "ishant",
"theme_url": "https://transportations/theme/%2A468%2Aishant"
},
"company_id": "63142b0c7f85820e2a60a376",
"live": true,
"notes": [
{
"note": "ghummo",
"_id": "631b499b709b18eb01ba99ed"
},
{
"note": "firooo",
"_id": "631b499b709b18eb01ba99ee"
}
],
"**v": 0
}
},
{
"\_id": "631ded28544d89302f86bade",
"itinerary_id": "631ab8a3334b646ea25df6ec",
"day": 2,
"components": {
"id": "631b495b7538199dc3c777b0",
"type": "activity",
"data": {
"time:": "4 hr",
"kheloo": 56789
},
"\_id": "631ded28544d89302f86bae2"
},
"**v": 0,
"activities": {
"\_id": "631b495b7538199dc3c777b0",
"type": "Excursion",
"theme": {
"theme_name": "ishant",
"theme_url": "https://activites/theme/%2A377%2Aishant"
},
"id": "969555",
"activity_name": "Ghumo Dubai",
"description": "Kteega",
"address": "12 khambaaa",
"live": true,
"company_id": "63142b0c7f85820e2a60a376",
"notes": [
{
"note": "Backchodiii",
"_id": "631b495b7538199dc3c777b1"
},
{
"note": "ghummo",
"_id": "631b495b7538199dc3c777b2"
}
],
"**v": 0
}
}
]

```

```
#   f l y  
 #   f l y z e r o  
 #   f l y z e r o  
 #   f l y z y 0  
 #   f l y 0  
 #   f l y 0  
 "# yash_fly0" 
#   f l y z y  
 