import React from "react";
import z from "zod";
import ConfirmModal from "../../../components/admin/ConfirmModal";
import EditMotifModal from "../../../components/admin/EditMotifModal";
import MotifForm from "../../../components/admin/MotifForm";
import Notification from "../../../components/Notification";
import BlurText from "../../../components/react-bits/BlurText/BlurText";
import MotifService from "../../../services/MotifService";
import DataGrid from "../../../components/admin/DataGrid";

const motifSchema = z.object({
  title: z.string().min(1, { message: "Nama wajib diisi" }),
  description: z.string().min(1, { message: "Deskripsi wajib diisi" }),
  image_url: z.string().min(1, { message: "Gambar wajib diisi" }),
});

const editMotifSchema = z.object({
  title: z.string().min(1, { message: "Nama wajib diisi" }),
  description: z.string().min(1, { message: "Deskripsi wajib diisi" }),
  image_url: z.string().min(1, { message: "Image is required" }).optional(),
});

class MotifDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      motifs: [],
      loading: false,
      submitting: false,
      editing: false,
      notification: null,
      editModal: { isOpen: false, motif: null },
      confirmModal: { isOpen: false, motif: null },
    };
  }

  componentDidMount() {
    this.loadMotifs();
  }

  showNotification = (message, type = "success") => {
    this.setState({ notification: { message, type } });
    setTimeout(() => this.setState({ notification: null }), 5000);
  };

  loadMotifs = async () => {
    this.setState({ loading: true });
    try {
      const motifs = await MotifService.getMotifs();
      this.setState({ motifs });
    } catch (error) {
      this.showNotification("Gagal memuat data motif", "error");
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSubmit = async (formData) => {
    this.setState({ submitting: true });
    try {
      let imageUrl = null;
      if (formData.image)
        imageUrl = await MotifService.uploadImage(formData.image);

      const motifData = {
        title: formData.title,
        description: formData.description,
        image_url: imageUrl ?? "",
      };
      motifSchema.parse(motifData);

      await MotifService.createMotif(motifData);
      this.showNotification("Motif berhasil ditambahkan!");
      this.loadMotifs();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((err) =>
          this.showNotification(err.message, "error")
        );
        return;
      }
      this.showNotification(
        error.message.includes("duplicate")
          ? "Judul motif sudah ada, gunakan judul yang berbeda"
          : "Gagal menyimpan motif. Silakan coba lagi.",
        "error"
      );
    } finally {
      this.setState({ submitting: false });
    }
  };

  handleDelete = async (id) => {
    try {
      await MotifService.deleteMotif(id);
      this.showNotification("Motif berhasil dihapus");
      this.loadMotifs();
    } catch {
      this.showNotification("Gagal menghapus motif", "error");
    }
  };

  openEditModal = (motif) =>
    this.setState({ editModal: { isOpen: true, motif } });
  closeEditModal = () =>
    this.setState({ editModal: { isOpen: false, motif: null } });
  openConfirmModal = (id, title) =>
    this.setState({ confirmModal: { isOpen: true, motif: { id, title } } });
  closeConfirmModal = () =>
    this.setState({ confirmModal: { isOpen: false, motif: null } });

  handleConfirmDelete = () => {
    const { confirmModal } = this.state;
    if (confirmModal.motif) this.handleDelete(confirmModal.motif.id);
  };

  handleEditSave = async (id, updateData) => {
    this.setState({ editing: true });
    try {
      let imageUrl = null;
      if (updateData.newImage)
        imageUrl = await MotifService.uploadImage(updateData.newImage);

      const payload = {
        title: updateData.title,
        description: updateData.description,
        ...(imageUrl && { image_url: imageUrl }),
      };
      editMotifSchema.parse(payload);

      await MotifService.updateMotif(id, payload);
      this.showNotification("Motif berhasil diperbarui!");
      this.closeEditModal();
      this.loadMotifs();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((err) =>
          this.showNotification(err.message, "error")
        );
        return;
      }
      this.showNotification(
        error.message.includes("duplicate")
          ? "Judul motif sudah ada, gunakan judul yang berbeda"
          : "Gagal memperbarui motif. Silakan coba lagi.",
        "error"
      );
    } finally {
      this.setState({ editing: false });
    }
  };

  render() {
    const {
      motifs,
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
                text="Dashboard Motif Batik"
                delay={1000}
                animateBy="words"
                direction="top"
                className="text-4xl font-bold text-white mb-4 text-center mx-auto"
              />
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Kelola koleksi motif batik Anda dengan mudah. Tambahkan, edit,
                dan hapus motif sesuai kebutuhan.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <MotifForm onSubmit={this.handleSubmit} loading={submitting} />
            </div>
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Koleksi Motif
                </h2>
                <p className="text-gray-400">
                  Semua motif batik yang telah Anda buat
                </p>
              </div>
              <DataGrid
                items={motifs}
                onDelete={this.openConfirmModal}
                onEdit={this.openEditModal}
                loading={loading}
              />
            </div>
          </div>
        </main>
        <EditMotifModal
          isOpen={editModal.isOpen}
          motif={editModal.motif}
          onClose={this.closeEditModal}
          onSave={this.handleEditSave}
          loading={editing}
        />
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={this.closeConfirmModal}
          onConfirm={this.handleConfirmDelete}
          title="Hapus Motif"
          message={`Apakah Anda yakin ingin menghapus motif "${confirmModal.motif?.title}"? Tindakan ini tidak dapat dibatalkan.`}
          confirmText="Ya, Hapus"
          cancelText="Batal"
          type="danger"
        />
      </div>
    );
  }
}

export default MotifDashboard;
