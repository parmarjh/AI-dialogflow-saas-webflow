// src/pages/IntentGeneration/IntentForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IntentFormData {
  name: string;
  trainingPhrases: string;
  language: string;
}

const IntentForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IntentFormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IntentFormData) => {
    setLoading(true);
    try {
      // API call implementation here
      console.log('Form submitted:', data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Intent Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            {...register('name', { required: 'Intent name is required' })}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Training Phrases</label>
          <textarea
            className={`form-control ${errors.trainingPhrases ? 'is-invalid' : ''}`}
            rows={5}
            {...register('trainingPhrases', { 
              required: 'Training phrases are required',
              minLength: { 
                value: 10, 
                message: 'Please provide at least 10 characters' 
              }
            })}
          />
          {errors.trainingPhrases && (
            <div className="invalid-feedback">{errors.trainingPhrases.message}</div>
          )}
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Intent'}
        </button>
      </div>
    </form>
  );
};

export default IntentForm;