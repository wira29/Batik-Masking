import React from "react";
import z from "zod";
import ConfirmModal from "../../../components/admin/ConfirmModal";
import EditGalleryModal from "../../../components/admin/EditGalleryModal";
import GalleryForm from "../../../components/admin/GalleryForm";
import Notification from "../../../components/Notification";
import BlurText from "../../../components/react-bits/BlurText/BlurText";
import GalleryService from "../../../services/GalleryService";
import DataGrid from "../../../components/admin/DataGrid";

const gallerySchema = z.object({
  title: z.string().min(1, { message: "Nama wajib diisi" }),
  description: z.string().min(1, { message: "Deskripsi wajib diisi" }),
  image_url: z.string().min(1, { message: "Gambar wajib diisi" }),
});

const editGallerySchema = z.object({
  title: z.string().min(1, { message: "Nama wajib diisi" }),
  description: z.string().min(1, { message: "Deskripsi wajib diisi" }),
  image_url: z.string().min(1, { message: "Gambar wajib diisi" }).optional(),
});

class GalleryDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      loading: false,
      submitting: false,
      editing: false,
      notification: null,
      editModal: {
        isOpen: false,
        gallery: null,
      },
      confirmModal: {
        isOpen: false,
        gallery: null,
      },
    };
  }

  componentDidMount() {
    this.loadGallery();
  }

  showNotification = (message, type = "success") => {
    this.setState({ notification: { message, type } });
    setTimeout(() => {
      this.setState({ notification: null });
    }, 5000);
  };

  loadGallery = async () => {
    this.setState({ loading: true });
    try {
      const gallery = await GalleryService.getGallery();
      this.setState({ gallery });
    } catch (error) {
      console.error("Error loading gallery:", error);
      this.showNotification("Gagal memuat data gallery", "error");
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSubmit = async (formData) => {
    this.setState({ submitting: true });
    
    try {
      let imageUrl = null;
      if (formData.image) {
        imageUrl = await GalleryService.uploadImage(formData.image);
      }

      const galleryData = {
        title: formData.title,
        description: formData.description,
        image_url: imageUrl,
      };

      gallerySchema.parse(galleryData);

      await GalleryService.createGalleryItem(galleryData);
      this.showNotification("Gallery berhasil ditambahkan!");
      this.loadGallery();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((err) => {
          this.showNotification(err.message, "error");
        });
        return;
      }

      this.showNotification(
        error.message.includes("duplicate")
          ? "Judul gallery sudah ada, gunakan judul yang berbeda"
          : "Gagal menyimpan gallery. Silakan coba lagi.",
        "error"
      );
    } finally {
      this.setState({ submitting: false });
    }
  };

  handleDelete = async (id) => {
    try {
      await GalleryService.deleteGalleryItem(id);
      this.showNotification("Gallery berhasil dihapus");
      this.loadGallery();
    } catch (error) {
      console.error("Error deleting gallery:", error);
      this.showNotification("Gagal menghapus gallery", "error");
    }
  };

  openEditModal = (gallery) => {
    this.setState({
      editModal: { isOpen: true, gallery },
    });
  };

  closeEditModal = () => {
    this.setState({
      editModal: { isOpen: false, gallery: null },
    });
  };

  openConfirmModal = (id, title) => {
    this.setState({
      confirmModal: { isOpen: true, gallery: { id, title } },
    });
  };

  closeConfirmModal = () => {
    this.setState({
      confirmModal: { isOpen: false, gallery: null },
    });
  };

  handleConfirmDelete = () => {
    const { confirmModal } = this.state;
    if (confirmModal.gallery) {
      this.handleDelete(confirmModal.gallery.id);
    }
  };

  handleEditSave = async (id, updateData) => {
    this.setState({ editing: true });
    
    try {
      let imageUrl = null;
      if (updateData.image_url) {
        imageUrl = await GalleryService.uploadImage(updateData.image_url);
      }

      const payload = {
        title: updateData.title,
        description: updateData.description,
        ...(imageUrl && { image_url: imageUrl }),
      };

      editGallerySchema.parse(payload);

      await GalleryService.updateGalleryItem(id, payload);
      this.showNotification("Gallery berhasil diperbarui!");
      this.closeEditModal();
      this.loadGallery();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((err) => {
          this.showNotification(err.message, "error");
        });
        return;
      }

      this.showNotification(
        error.message.includes("duplicate")
          ? "Judul gallery sudah ada, gunakan judul yang berbeda"
          : "Gagal memperbarui gallery. Silakan coba lagi.",
        "error"
      );
    } finally {
      this.setState({ editing: false });
    }
  };

  render() {
    const {
      gallery,
      loading,
      submitting,
      editing,
      notification,
      editModal,
      confirmModal,
    } = this.state;

    return (
      <div className="min-h-screen bg-black">
        <Notification notification={notification} />

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-8">
            <div className="text-center flex flex-col gap-2 justify-center">
              <BlurText
                text="Dashboard Gallery"
                delay={1000}
                animateBy="words"
                direction="top"
                className="text-4xl font-bold text-white mb-4 text-center mx-auto"
              />
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Kelola koleksi gallery batik Anda dengan mudah. Tambahkan, edit,
                dan hapus sesuai kebutuhan.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <GalleryForm onSubmit={this.handleSubmit} loading={submitting} />
            </div>

            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Koleksi Gallery
                </h2>
                <p className="text-gray-400">
                  Semua gallery yang telah Anda buat
                </p>
              </div>

              <DataGrid
                items={gallery}
                onDelete={this.openConfirmModal}
                onEdit={this.openEditModal}
                loading={loading}
              />
            </div>
          </div>
        </main>

        <EditGalleryModal
          isOpen={editModal.isOpen}
          gallery={editModal.gallery}
          onClose={this.closeEditModal}
          onSave={this.handleEditSave}
          loading={editing}
        />

        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={this.closeConfirmModal}
          onConfirm={this.handleConfirmDelete}
          title="Hapus Gallery"
          message={`Apakah Anda yakin ingin menghapus gallery "${confirmModal.gallery?.title}"? Tindakan ini tidak dapat dibatalkan.`}
          confirmText="Ya, Hapus"
          cancelText="Batal"
          type="danger"
        />
      </div>
    );
  }
}

export default GalleryDashboard;
