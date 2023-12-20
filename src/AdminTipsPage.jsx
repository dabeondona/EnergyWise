import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import "./css/LP-Styling.css";
import "./css/R-Styling.css";
import "./css/Tips.css"; 


Modal.setAppElement('#root');

export default function AdminTips() {
    const [newTipTitle, setNewTipTitle] = useState('');
    const [newTipBody, setNewTipBody] = useState('');
    const [newTipDate, setNewTipDate] = useState('');
    const [tips, setTips] = useState([]);
    const [selectedTip, setSelectedTip] = useState(null);
    const [updatedTip, setUpdatedTip] = useState('');
    const [updatedTitle, setUpdatedTitle] = useState(''); 
    const [updatedContent, setUpdatedContent] = useState('');
    const [tipDetails, setTipDetails] = useState({ title: '', content: '' });
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        
         // Fetch existing tips from the server when the component mounts
         axios.get('http://localhost:8080/tips/getAllTips')
         .then(response => {
             setTips(response.data);
         })
         .catch(error => {
             console.error('Error fetching tips', error);
         });

        
    }, []);

    
    const handleCreateTip = () => {
        if (newTipTitle.trim() !== '' && newTipBody.trim() !== '' && newTipDate.trim() !== '') {
            axios.post('http://localhost:8080/tips/insertTips', {
                title: newTipTitle,
                content: newTipBody,
                date: newTipDate
            })
            .then(response => {
                setTips([...tips, response.data]);
                setNewTipTitle('');
                setNewTipBody('');
                setNewTipDate('');
            })
            .catch(error => {
                console.error('Error creating tip', error);
            });
        }
    };
   

    const handleUpdateTip = () => {
        if (selectedTip && selectedTip.tip_id && (updatedTitle.trim() !== '' || updatedContent.trim() !== '')) {
          const confirmation = window.confirm('Are you sure you want to save changes?');
          if (confirmation) {
            axios.put(`http://localhost:8080/tips/updateTips?tip_id=${selectedTip.tip_id}`, {
              title: updatedTitle,
              content: updatedContent,
              date: newTipDate,
            })
            .then(response => {
              
              const updatedTips = tips.map(tip => {
                if (tip.tip_id === selectedTip.tip_id) {
                  return { ...tip, title: updatedTitle, content: updatedContent, date: newTipDate };
                }
                return tip;
              });
              setTips(updatedTips);
              closeModal(); 
            })
            .catch(error => {
              console.error('Error updating tip', error);
            });
          }
        }
      };
      
      const handleDeleteTip = () => {
        if (selectedTip !== null) {
            const confirmation = window.confirm('Are you sure you want to delete this tip?');
            if (confirmation) {
                axios.delete(`http://localhost:8080/tips/deleteTips/${selectedTip.tip_id}`)
                    .then(() => {
                        console.log('Tip deleted successfully.');
                        const updatedTips = tips.filter(tip => tip.tip_id !== selectedTip.tip_id);
                        setTips(updatedTips); // Update the state with tips except the deleted one
                        setTipDetails({ title: '', content: '' });
                        setSelectedTip(null);
                    })
                    .catch(error => {
                        console.error('Error deleting tip:', error);
                    });
            }
        }
    };
    
    
  const openModal = (tip) => {
    setSelectedTip(tip);
    setUpdatedTitle(tip.title);
    setUpdatedContent(tip.content);
    setModalIsOpen(true);
  };


  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTip(null);
    setUpdatedTitle('');
    setUpdatedContent('');
  };

  const handleSelectTip = (selectedTip) => {
    setSelectedTip(selectedTip);
    setUpdatedTitle(selectedTip.title);
    setUpdatedContent(selectedTip.content);
    
  };

    return (
        
        <div className="admin-main">
        <div className="main">
            <div className="navigation">
                <img src="energywise_logo.png" alt="Logo" width="170px" style={{ marginLeft: "25px", marginBottom: "50px" }} />
                <ul className="nav-list">
                    <li><NavLink to="/user-lists" activeClassName="active">Users</NavLink></li>
                    <li><NavLink to="/admin-tips" activeClassName="active">Tips</NavLink></li>
                    <li><NavLink to="/login" activeClassName="active">Logout</NavLink></li>
                </ul>
            </div>
            
        </div>

        <div className="admin-content">
            <p className='header-admin'>Welcome, admin!</p>
            <hr /> 
        </div>    

            <div className="admin-content">
                {/* Create New Tip */}
                <div className="tip-card create-tip-card">
                    <h2>Create New Tip</h2>
                    <div className="tip-info">
                        <input
                            type="text"
                            value={newTipTitle}
                            onChange={(e) => setNewTipTitle(e.target.value)}
                            placeholder="Enter tip title..."
                            className="title-input"
                        />
                        <input
                            type="date"
                            value={newTipDate}
                            onChange={(e) => setNewTipDate(e.target.value)}
                            className="date-input"
                        />
                    </div>
                    <textarea
                        value={newTipBody}
                        onChange={(e) => setNewTipBody(e.target.value)}
                        placeholder="Enter tip content..."
                        rows={4}
                    ></textarea>
                    <button className="create-button" onClick={handleCreateTip}>Create</button>
                </div>
                <br/>

               {/* Table displaying tips */}
               <div className="tips-table">
                    <h2>All Tips</h2>
                    <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tips.map((tip) => (
            <tr key={tip.id} onClick={() => handleSelectTip(tip)}>
              <td>{tip.title}</td>
              <td className="content-cell">
                                    {tip.content?.substring(0, 50)}{tip.content && tip.content.length > 50 ? '...' : ''}
                                </td>
              <td>{tip.date}</td>
              <td className="action-cell">
                <button onClick={() => openModal(tip)}>Update</button>
                <button onClick={() => handleDeleteTip(tip.id)} className="delete-button">Delete</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>

                    {/* Modal for updating tip */}
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                        >
                        <div className="modal-header">
                            <h2>Edit Tip</h2>
                        </div>
                        <div className="input-group">
                            <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            placeholder="Enter updated title"
                            />
                            <input
                            type="date"
                            value={newTipDate}
                            onChange={(e) => setNewTipDate(e.target.value)}
                            className="date-input"
                            />
                        </div>
                        <br/>
                        <textarea
                            value={updatedContent}
                            onChange={(e) => setUpdatedContent(e.target.value)}
                            placeholder="Enter updated content"
                            rows={4}
                            className="content-input"
                        ></textarea>
                        <div className="modal-footer">
                            <button onClick={handleUpdateTip} className='save-btn'>Save Changes</button>
                            <span className="button-space"></span>
                            <button onClick={closeModal} className='cancel-btn'>Cancel</button>
                        </div>
                    </Modal>
                </div>         
            </div>
        </div>
    );
}