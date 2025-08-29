import React from "react";
import z from "zod";
import ConfirmModal from "../../../components/admin/ConfirmModal";
import ArtikelForm from "../../../components/admin/ArtikelForm";
import Notification from "../../../components/Notification";
import BlurText from "../../../components/react-bits/BlurText/BlurText";
import DataGrid from "../../../components/admin/DataGrid";
import EditArtikelModal from "../../../components/admin/EditArtikelModal";
import ArtikelService from "../../../services/ArticleService"

const artikelSchema = z.object({
  title: z.string().min(1, { message: "Judul wajib diisi" }),
  description: z.string().min(1, { message: "Deskripsi wajib diisi" }),
  image_url: z.string().min(1, { message: "Gambar wajib diisi" }),
  slug: z.string().min(1, { message: "Slug wajib diisi" }),
  author: z.string().min(1, { message: "Author wajib diisi" }),
});

const editArtikelSchema = z.object({
  title: z.string().min(1, { message: "Judul wajib diisi" }),
  description: z.string().min(1, { message: "Deskripsi wajib diisi" }),
  image_url: z.string().optional(),
  slug: z.string().min(1, { message: "Slug wajib diisi" }),
  author: z.string().min(1, { message: "Author wajib diisi" }),
});

class ArtikelDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artikels: [],
      loading: false,
      submitting: false,
      editing: false,
      notification: null,
      editModal: {
        isOpen: false,
        artikel: null,
      },
      confirmModal: {
        isOpen: false,
        artikel: null,
      },
    };
  }

  componentDidMount() {
    this.loadArtikels();
  }

  showNotification = (message, type = "success") => {
    this.setState({ notification: { message, type } });
    setTimeout(() => {
      this.setState({ notification: null });
    }, 5000);
  };

  loadArtikels = async () => {
    this.setState({ loading: true });
    try {
      const artikels = await ArtikelService.getArticles();
      this.setState({ artikels });
    } catch (error) {
      console.error("Error loading artikels:", error);
      this.showNotification("Gagal memuat data artikel", "error");
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSubmit = async (formData) => {
    this.setState({ submitting: true });
    try {
      let imageUrl = null;
      if (formData.image) {
        imageUrl = await ArtikelService.uploadImage(formData.image);
      }

      const artikelData = {
        title: formData.title,
        description: formData.description,
        slug: formData.slug,
        author: formData.author,
        image_url: imageUrl ?? "",
      };

      artikelSchema.parse(artikelData);

      await ArtikelService.createArticle(artikelData);
      this.showNotification("Artikel berhasil ditambahkan!");
      this.loadArtikels();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((err) => {
          this.showNotification(err.message, "error");
        });
        return;
      }

      this.showNotification(
        error.message.includes("duplicate")
          ? "Judul artikel sudah ada, gunakan judul yang berbeda"
          : "Gagal menyimpan artikel. Silakan coba lagi.",
        "error"
      );
    } finally {
      this.setState({ submitting: false });
    }
  };

  handleDelete = async (id) => {
    try {
      await ArtikelService.deleteArticle(id);
      this.showNotification("Artikel berhasil dihapus");
      this.loadArtikels();
    } catch (error) {
      console.error("Error deleting artikel:", error);
      this.showNotification("Gagal menghapus artikel", "error");
    }
  };

  openEditModal = (artikel) => {
    this.setState({
      editModal: { isOpen: true, artikel },
    });
  };

  closeEditModal = () => {
    this.setState({
      editModal: { isOpen: false, artikel: null },
    });
  };

  openConfirmModal = (id, title) => {
    this.setState({
      confirmModal: { isOpen: true, artikel: { id, title } },
    });
  };

  closeConfirmModal = () => {
    this.setState({
      confirmModal: { isOpen: false, artikel: null },
    });
  };

  handleConfirmDelete = () => {
    const { confirmModal } = this.state;
    if (confirmModal.artikel) {
      this.handleDelete(confirmModal.artikel.id);
    }
  };

  handleEditSave = async (id, updateData) => {
    this.setState({ editing: true });
    try {
      let imageUrl = null;
      if (updateData.newImage) {
        imageUrl = await ArtikelService.uploadImage(updateData.newImage);
      }

      const payload = {
        title: updateData.title,
        description: updateData.description,
        slug: updateData.slug,
        author: updateData.author,
        ...(imageUrl && { image_url: imageUrl }),
      };

      editArtikelSchema.parse(payload);

      await ArtikelService.updateArticle(id, payload);
      this.showNotification("Artikel berhasil diperbarui!");
      this.closeEditModal();
      this.loadArtikels();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((err) => {
          this.showNotification(err.message, "error");
        });
        return;
      }

      this.showNotification(
        error.message.includes("duplicate")
          ? "Judul artikel sudah ada, gunakan judul yang berbeda"
          : "Gagal memperbarui artikel. Silakan coba lagi.",
        "error"
      );
    } finally {
      this.setState({ editing: false });
    }
  };

  render() {
    const {
      artikels,
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
                text="Dashboard Artikel"
                delay={1000}
                animateBy="words"
                direction="top"
                className="text-4xl font-bold text-white mb-4 text-center mx-auto"
              />
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Kelola artikel Anda dengan mudah. Tambahkan, edit, dan hapus artikel sesuai kebutuhan.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <ArtikelForm onSubmit={this.handleSubmit} loading={submitting} />
            </div>

            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Semua Artikel
                </h2>
                <p className="text-gray-400">
                  Semua artikel yang telah Anda buat
                </p>
              </div>

              <DataGrid 
                items={artikels}
                onDelete={this.openConfirmModal}
                onEdit={this.openEditModal}
                loading={loading}
              />
            </div>
          </div>
        </main>

        <EditArtikelModal
          isOpen={editModal.isOpen}
          artikel={editModal.artikel}
          onClose={this.closeEditModal}
          onSave={this.handleEditSave}
          loading={editing}
        />

        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={this.closeConfirmModal}
          onConfirm={this.handleConfirmDelete}
          title="Hapus Artikel"
          message={`Apakah Anda yakin ingin menghapus artikel "${confirmModal.artikel?.title}"? Tindakan ini tidak dapat dibatalkan.`}
          confirmText="Ya, Hapus"
          cancelText="Batal"
          type="danger"
        />
      </div>
    );
  }
}

export default ArtikelDashboard;
