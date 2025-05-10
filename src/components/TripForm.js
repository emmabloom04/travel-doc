import React, {useState} from 'react';

function TripForm({addTrip, cancel}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFiles, setImageFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        
        const promises = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });
        Promise.all(promises). then((images) => {
            setImageFiles(images);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // doesn't allow for an empty trip title
        if (title.trim() == '') return;

        addTrip({ title, description, images: imageFiles });

        // clear form
        setTitle('');
        setDescription('');
        setImageFiles([]);
    }

    return (
        <form onSubmit={handleSubmit} className="trip-form">
            <h2>Add a new trip</h2>
            <div className="input-container">
                <input 
                    className="trip-location"
                    type="text"
                    placeholder="Trip location"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea 
                    className="trip-description"
                    placeholder="Trip description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                />
                <input 
                    className="trip-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                />
            </div>
            <div className="form-buttons">
                <button className="add-trip" type="submit">Add Trip</button>
                <button className="cancel" type="button" onClick={cancel}>Cancel</button>
            </div>
        </form>
    )
}

export default TripForm;