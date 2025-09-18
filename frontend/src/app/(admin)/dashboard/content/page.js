'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function ContentManager() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState(null);
  const [contentData, setContentData] = useState({});
  const [saving, setSaving] = useState(false);

  const sectionTypes = [
    { id: 'hero', name: 'Hero Section', fields: ['title', 'subtitle', 'buttonText', 'imageUrl'] },
    { id: 'about', name: 'About Section', fields: ['title', 'description', 'imageUrl'] },
    { id: 'products', name: 'Products Section', fields: ['title', 'description'] },
    { id: 'clients', name: 'Clients Section', fields: ['title', 'description'] },
    { id: 'contact', name: 'Contact Section', fields: ['title', 'address', 'email', 'phone'] }
  ];

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/content');
      setSections(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching content sections:', error);
      toast.error('Failed to load content sections');
      setLoading(false);
    }
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    // Find the content for this section if it exists
    const existingContent = sections.find(
      s => s.section === section.id && s.page === 'home'
    );
    
    if (existingContent) {
      setContentData(existingContent.content);
    } else {
      // Initialize with empty values
      const initialData = {};
      section.fields.forEach(field => {
        initialData[field] = '';
      });
      setContentData(initialData);
    }
  };

  const handleInputChange = (field, value) => {
    setContentData({
      ...contentData,
      [field]: value
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      await axios.post('/api/content', {
        section: selectedSection.id,
        page: 'home',
        content: contentData
      });
      
      toast.success('Content saved successfully');
      fetchSections(); // Refresh the data
      setSaving(false);
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Content Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Page Sections</h2>
          <ul className="space-y-2">
            {sectionTypes.map((section) => (
              <li 
                key={section.id}
                className={`p-3 rounded cursor-pointer ${
                  selectedSection?.id === section.id 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => handleSectionSelect(section)}
              >
                {section.name}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-3 bg-white p-6 rounded-lg shadow">
          {selectedSection ? (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Edit {selectedSection.name}
              </h2>
              
              <div className="space-y-4">
                {selectedSection.fields.map((field) => (
                  <div key={field} className="form-control">
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {field.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    
                    {field.includes('description') ? (
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                        value={contentData[field] || ''}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                      />
                    ) : field.includes('image') ? (
                      <div>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          value={contentData[field] || ''}
                          onChange={(e) => handleInputChange(field, e.target.value)}
                          placeholder="Image URL"
                        />
                        {contentData[field] && (
                          <div className="mt-2">
                            <img 
                              src={contentData[field]} 
                              alt="Preview" 
                              className="h-24 object-cover rounded-md"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.png';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={contentData[field] || ''}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                      />
                    )}
                  </div>
                ))}
                
                <div className="mt-6">
                  <button
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      saving ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Select a section from the sidebar to edit its content
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}