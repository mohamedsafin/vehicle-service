import { useEffect, useState } from 'react';
import { Edit3, ImagePlus, Plus, Trash2, Truck } from 'lucide-react';
import Modal from '../components/Modal';
import PageHeader from '../components/PageHeader';
import { EmptyBlock, ErrorBlock, LoadingBlock } from '../components/StateBlock';
import { adminApi } from '../services/adminApi';
import { API_BASE_URL, getErrorMessage } from '../services/api';
import { statusClass } from '../utils/format';

const initialVehicle = {
  vehicleName: '',
  vehicleType: '',
  capacity: '',
  availability: 'Available',
  image: null,
};

const availabilityOptions = ['Available', 'In Transit', 'Maintenance', 'Unavailable'];

export default function FleetManagementPage() {
  const [fleet, setFleet] = useState([]);
  const [formData, setFormData] = useState(initialVehicle);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const loadFleet = async ({ showLoading = false } = {}) => {
    if (showLoading) setIsLoading(true);
    try {
      const response = await adminApi.fleet();
      setFleet(response.data.data);
      setError('');
    } catch (fleetError) {
      setError(getErrorMessage(fleetError, 'Unable to load fleet'));
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialFleet = async () => {
      try {
        const response = await adminApi.fleet();
        if (!isMounted) return;
        setFleet(response.data.data);
      } catch (fleetError) {
        if (isMounted) setError(getErrorMessage(fleetError, 'Unable to load fleet'));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadInitialFleet();
    return () => {
      isMounted = false;
    };
  }, []);

  const openCreateModal = () => {
    setEditingVehicle(null);
    setFormData(initialVehicle);
    setModalOpen(true);
  };

  const openEditModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      vehicleName: vehicle.vehicleName,
      vehicleType: vehicle.vehicleType,
      capacity: vehicle.capacity,
      availability: vehicle.availability,
      image: null,
    });
    setModalOpen(true);
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((current) => ({ ...current, [name]: files ? files[0] : value }));
  };

  const buildPayload = () => {
    const payload = new FormData();
    payload.append('vehicleName', formData.vehicleName);
    payload.append('vehicleType', formData.vehicleType);
    payload.append('capacity', formData.capacity);
    payload.append('availability', formData.availability);
    if (formData.image) payload.append('image', formData.image);
    return payload;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      if (editingVehicle) {
        await adminApi.updateFleet(editingVehicle._id, buildPayload());
      } else {
        await adminApi.createFleet(buildPayload());
      }

      setModalOpen(false);
      await loadFleet({ showLoading: true });
    } catch (saveError) {
      setError(getErrorMessage(saveError, 'Unable to save vehicle'));
    } finally {
      setIsSaving(false);
    }
  };

  const deleteVehicle = async (id) => {
    if (!window.confirm('Delete this vehicle?')) return;

    try {
      await adminApi.deleteFleet(id);
      await loadFleet({ showLoading: true });
    } catch (deleteError) {
      setError(getErrorMessage(deleteError, 'Unable to delete vehicle'));
    }
  };

  const resolveImage = (imageUrl) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `${API_BASE_URL}${imageUrl}`;
  };

  return (
    <div>
      <PageHeader
        eyebrow="Assets"
        title="Fleet Management"
        description="Add, edit, delete, and track vehicle availability across the logistics fleet."
        action={
          <button
            type="button"
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-primary px-4 py-3 text-sm font-black text-white shadow-lg transition hover:bg-orange-dark"
          >
            <Plus className="h-4 w-4" />
            Add Vehicle
          </button>
        }
      />

      {error && <div className="mb-5"><ErrorBlock message={error} /></div>}
      {isLoading ? (
        <LoadingBlock label="Loading fleet" />
      ) : fleet.length === 0 ? (
        <EmptyBlock title="No fleet vehicles yet" description="Add your first vehicle to start managing fleet availability." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {fleet.map((vehicle) => (
            <article key={vehicle._id} className="overflow-hidden rounded-2xl border border-navy-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="relative aspect-[16/10] bg-navy-100">
                {vehicle.imageUrl ? (
                  <img src={resolveImage(vehicle.imageUrl)} alt={vehicle.vehicleName} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-navy-400">
                    <Truck className="h-12 w-12" />
                  </div>
                )}
                <span className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-black ${statusClass(vehicle.availability)}`}>
                  {vehicle.availability}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-black text-navy-950">{vehicle.vehicleName}</h3>
                <p className="mt-1 text-sm font-semibold text-navy-500">{vehicle.vehicleType}</p>
                <p className="mt-4 text-sm font-bold text-navy-700">Capacity: {vehicle.capacity}</p>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(vehicle)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-navy-200 px-3 py-2 text-sm font-black text-navy-700 transition hover:border-orange-primary hover:text-orange-primary"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteVehicle(vehicle._id)}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50"
                    aria-label="Delete vehicle"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title={editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-navy-500">Vehicle Name</span>
                <input name="vehicleName" value={formData.vehicleName} onChange={handleChange} required className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm font-semibold outline-none focus:border-orange-primary" />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-navy-500">Vehicle Type</span>
                <input name="vehicleType" value={formData.vehicleType} onChange={handleChange} required className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm font-semibold outline-none focus:border-orange-primary" />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-navy-500">Capacity</span>
                <input name="capacity" value={formData.capacity} onChange={handleChange} required placeholder="18 tons / 32 pallets" className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm font-semibold outline-none focus:border-orange-primary" />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-black uppercase tracking-wide text-navy-500">Availability</span>
                <select name="availability" value={formData.availability} onChange={handleChange} className="w-full rounded-xl border border-navy-200 px-4 py-3 text-sm font-semibold outline-none focus:border-orange-primary">
                  {availabilityOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-navy-300 bg-navy-50 p-6 text-center transition hover:border-orange-primary hover:bg-orange-light/50">
              <ImagePlus className="h-8 w-8 text-orange-primary" />
              <span className="mt-2 text-sm font-black text-navy-950">Upload Vehicle Image</span>
              <span className="mt-1 text-xs font-semibold text-navy-500">{formData.image?.name || 'PNG, JPG, or WEBP up to 3MB'}</span>
              <input name="image" type="file" accept="image/*" onChange={handleChange} className="sr-only" />
            </label>
            <button
              type="submit"
              disabled={isSaving}
              className="w-full rounded-xl bg-orange-primary px-5 py-3.5 text-sm font-black text-white transition hover:bg-orange-dark disabled:opacity-60"
            >
              {isSaving ? 'Saving Vehicle' : editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
