import React from "react";
import z from "zod";
import ConfirmModal from "../../../components/admin/ConfirmModal";
import DataGrid from "../../../components/admin/DataGrid";
import Notification from "../../../components/Notification";
import BlurText from "../../../components/react-bits/BlurText/BlurText";
import ModelService from "../../../services/ModelService";
import EditModelModal from "../../../components/admin/EditModelModal";
import ModelForm from "../../../components/admin/ModelForm";

const modelSchema = z.object({
  file_url: z.string().min(1, { message: "File OBJ wajib diupload" }),
  layout_url: z.string().min(1, { message: "Layout wajib diupload" }),
  preview_url: z.string().min(1, { message: "Preview wajib diupload" }),
});

const editModelSchema = z.object({
  file_url: z
    .string()
    .min(1, { message: "File OBJ wajib diupload" })
    .optional(),
  layout_url: z
    .string()
    .min(1, { message: "Layout wajib diupload" })
    .optional(),
  preview_url: z
    .string()
    .min(1, { message: "Preview wajib diupload" })
    .optional(),
});

class ModelDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
      loading: false,
      submitting: false,
      editing: false,
      deletingId: null,
      notification: null,
      editModal: {
        isOpen: false,
        model: null,
      },
      confirmModal: {
        isOpen: false,
        model: null,
      },
    };
  }

  componentDidMount() {
    this.loadModels();
  }

  showNotification = (message, type = "success") => {
    this.setState({ notification: { message, type } });
    setTimeout(() => {
      this.setState({ notification: null });
    }, 5000);
  };

  loadModels = async () => {
    this.setState({ loading: true });
    try {
      const models = await ModelService.getModels();
      this.setState({ models });
    } catch (error) {
      console.error("Error loading models:", error);
      this.showNotification("Gagal memuat data model", "error");
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSubmit = async (formData) => {
    this.setState({ submitting: true });
    try {
      const fileUrl = formData.file
        ? await ModelService.uploadFile(formData.file)
        : null;
      const layoutUrl = formData.layout
        ? await ModelService.uploadFile(formData.layout)
        : null;
      const previewUrl = formData.preview
        ? await ModelService.uploadFile(formData.preview)
        : null;

      const payload = {
        file_url: fileUrl,
        layout_url: layoutUrl,
        preview_url: previewUrl,
      };

      modelSchema.parse(payload);

      await ModelService.createModel(payload);

      this.showNotification("Model berhasil ditambahkan!");
      this.loadModels();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((err) =>
          this.showNotification(err.message, "error")
        );
        return;
      }
      console.error(error);
      this.showNotification(
        "Gagal menyimpan model. Silakan coba lagi.",
        "error"
      );
    } finally {
      this.setState({ submitting: false });
    }
  };

  handleDelete = async (id) => {
    this.setState({ deletingId: id });
    try {
      await ModelService.deleteModel(id);
      this.showNotification("Model berhasil dihapus");
      this.loadModels();
    } catch (error) {
      console.error("Error deleting model:", error);
      this.showNotification("Gagal menghapus model", "error");
    } finally {
      this.setState({ deletingId: null });
    }
  };

  openEditModal = (model) => {
    this.setState({
      editModal: { isOpen: true, model },
    });
  };

  closeEditModal = () => {
    this.setState({
      editModal: { isOpen: false, model: null },
    });
  };

  handleEditSave = async (id, updateData) => {
    this.setState({ editing: true });
    try {
      let fileUrl = updateData.file
        ? await ModelService.uploadFile(updateData.file)
        : null;
      let layoutUrl = updateData.layout
        ? await ModelService.uploadFile(updateData.layout)
        : null;
      let previewUrl = updateData.preview
        ? await ModelService.uploadFile(updateData.preview)
        : null;

      const payload = {
        ...(fileUrl && { file_url: fileUrl }),
        ...(layoutUrl && { layout_url: layoutUrl }),
        ...(previewUrl && { preview_url: previewUrl }),
      };

      editModelSchema.parse(payload);

      if (Object.keys(payload).length === 0) {
        console.warn("Tidak ada data yang berubah, skip update");
        this.setState({ editing: false });
        return;
      }

      await ModelService.updateModel(id, payload);

      this.showNotification("Model berhasil diperbarui!");
      this.closeEditModal();
      this.loadModels();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((err) =>
          this.showNotification(err.message, "error")
        );
        return;
      }
      console.error("Update gagal:", error);
      this.showNotification(
        "Gagal memperbarui model. Silakan coba lagi.",
        "error"
      );
    } finally {
      this.setState({ editing: false });
    }
  };

  openConfirmModal = (id) => {
    this.setState({
      confirmModal: { isOpen: true, model: { id } },
    });
  };

  closeConfirmModal = () => {
    this.setState({
      confirmModal: { isOpen: false, model: null },
    });
  };

  handleConfirmDelete = () => {
    const { confirmModal } = this.state;
    if (confirmModal.model) {
      this.handleDelete(confirmModal.model.id);
    }
  };

  render() {
    const {
      models,
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
                text="Dashboard Model"
                delay={1000}
                animateBy="words"
                direction="top"
                className="text-4xl font-bold text-white mb-4 text-center mx-auto"
              />
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Kelola file model (.obj) Anda dengan mudah. Tambahkan dan hapus
                model sesuai kebutuhan.
              </p>
            </div>

            <ModelForm onSubmit={this.handleSubmit} loading={submitting} />

            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Koleksi Model
                </h2>
                <p className="text-gray-400">
                  Semua model (.obj) yang telah Anda upload
                </p>
              </div>

              <DataGrid
                items={models}
                onDelete={this.openConfirmModal}
                onEdit={this.openEditModal}
                loading={loading}
                deletingId={this.state.deletingId}
              />
            </div>
          </div>
        </main>

        <EditModelModal
          isOpen={editModal.isOpen}
          model={editModal.model}
          onClose={this.closeEditModal}
          onSave={this.handleEditSave}
          loading={editing}
        />

        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={this.closeConfirmModal}
          onConfirm={this.handleConfirmDelete}
          title="Hapus Model"
          message={`Apakah Anda yakin ingin menghapus model ini? Tindakan ini tidak dapat dibatalkan.`}
          confirmText="Ya, Hapus"
          cancelText="Batal"
          type="danger"
        />
      </div>
    );
  }
}

export default ModelDashboard;
