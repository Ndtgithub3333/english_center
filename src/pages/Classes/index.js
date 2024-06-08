import React, { useEffect, useState } from 'react';
import classNames from "classnames/bind";
import styles from '~/pages/Classes/Classes.module.scss';
import AddClassForm from '~/pages/Classes/AddClassForm';
import EditClassForm from '~/pages/Classes/EditClassForm';

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

    const handleDelete = (id) => {
        setClasses(classes.filter(cls => cls.id !== id));
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
