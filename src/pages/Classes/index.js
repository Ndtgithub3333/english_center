import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/pages/Classes/Classes.module.scss';
import AddClassForm from '~/pages/Classes/AddClassForm';
import EditClassForm from '~/pages/Classes/EditClassForm';
import { delApi, getApi } from '~/utils/fetchData';

const cx = classNames.bind(styles);

function Classes() {
    const [classes, setClasses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editClassId, setEditClassId] = useState(null);

    const fakeClasses = [
        {
            id: 1,
            title: 'Math Class',
            studentCount: 20,
            expectedLessons: 15,
            tuitionFees: 100,
            teacherName: 'Mr. Smith'
        },
        // Other fake classes here
    ];

    useEffect(() => {
        setClasses(fakeClasses);
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this class?");
        if (!confirmDelete) {
            return;
        }

        const backupClasses = [...classes];
        setClasses(classes.filter(cls => cls.id !== id));
        try {
            // Call API to delete class
            const response = await delApi(`class/${id}`);
            if (response.status !== 200) {
                alert('Failed to delete class');
            }
        } catch (ex) {
            alert(`Failed to delete class: ${ex.message}`);
            setClasses(backupClasses);
        }
    };

    const handleViewDetails = (id) => {
        alert(`Viewing details for class id: ${id}`);
    };

    const handleEdit = (id) => {
        setEditClassId(id);
    };

    const handleAddClass = () => {
        setEditClassId(null);
        setShowForm(true);
    };

    const handleCreateClass = (newClassData) => {
        if (editClassId !== null) {
            const updatedClasses = classes.map(cls => (cls.id === editClassId ? newClassData : cls));
            setClasses(updatedClasses);
        } else {
            setClasses([...classes, newClassData]);
        }
        setShowForm(false);
        setEditClassId(null);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditClassId(null);
    };

    const handleFetchClasses = async () => {
        try {
            const response = await getApi('class');
            if (response.status === 200) {
                console.log(response.data);
                setClasses(response.data.map(cls => ({
                    id: cls.id,
                    title: cls.class_name,
                    studentCount: cls.Students.length,
                    expectedLessons: 20,
                    teacherName: cls.Teacher.full_name
                })));
            }
        } catch (ex) {
            alert(`Failed to fetch classes: ${ex.message}`);
        }
    };

    useEffect(() => {
        handleFetchClasses();
    }, []);

    return (
        <div className={cx('classes-page')}>
            <h1>Classes</h1>
            {showForm || editClassId !== null ? (
                <div className={cx('form-container')}>
                    {showForm && (
                        <AddClassForm
                            onCreateClass={handleCreateClass}
                            onCancel={handleCancel}
                        />
                    )}
                    {editClassId !== null && (
                        <EditClassForm
                            onSave={handleCreateClass}
                            onCancel={handleCancel}
                            classData={classes.find(cls => cls.id === editClassId)}
                        />
                    )}
                </div>
            ) : (
                <div className={cx('classes-list')}>
                    {classes.map(cls => (
                        <div key={cls.id} className={cx('class-card')}>
                            <div className={cx('class-info')}>
                                <h2>{cls.title}</h2>
                                <div className={cx('info-row')}>
                                    <div className={cx('info-label')}>Students:</div>
                                    <div className={cx('info-value')}>{cls.studentCount}</div>
                                </div>
                                <div className={cx('info-row')}>
                                    <div className={cx('info-label')}>Expected Lessons:</div>
                                    <div className={cx('info-value')}>{cls.expectedLessons}</div>
                                </div>
                                <div className={cx('info-row')}>
                                    <div className={cx('info-label')}>Teacher:</div>
                                    <div className={cx('info-value')}>{cls.teacherName}</div>
                                </div>
                            </div>
                            <div className={cx('class-actions')}>
                                <button onClick={() => handleViewDetails(cls.id)}>🔍</button>
                                <button onClick={() => handleEdit(cls.id)}>✏️</button>
                                <button onClick={() => handleDelete(cls.id)}>🗑️</button>
                            </div>
                        </div>
                    ))}
                    <div className={cx('add-class-card')} onClick={handleAddClass}>
                        <span>+</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Classes;
