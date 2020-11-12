

export const fileUpload = async (file) => {
    const CloudUrl = 'https://api.cloudinary.com/v1_1/dxzcc8gu5/upload';

    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file',file);

    try {
        const resp = await fetch(CloudUrl,{
            method: 'POST',
            body: formData
        })
        if(resp.ok){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }
    } catch (error) {
        throw error;
    }


}
