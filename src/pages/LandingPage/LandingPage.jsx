import React from "react";

const LandingPage = () => {
  return (
    <div
      class="relative flex size-full min-h-screen flex-col bg-black dark group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div class="layout-container flex h-full grow flex-col">

        <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#393028] px-10 py-6 sticky">
          <div class="flex items-center gap-4 text-white">
            <div class="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_6_319)">
                  <path
                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_319">
                    <rect width="48" height="48" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              Batik Nusantara
            </h2>
          </div>
          <div class="flex flex-1 justify-end gap-8">
            <div class="flex items-center gap-9">
              <a class="text-white text-sm font-medium leading-normal" href="#">
                Beranda
              </a>
              <a class="text-white text-sm font-medium leading-normal" href="#">
                Motif batik
              </a>
              <a class="text-white text-sm font-medium leading-normal" href="#">
                Model 3D
              </a>
              <a class="text-white text-sm font-medium leading-normal" href="#">
                Blogs
              </a>
            </div>
          </div>
        </header>

        <div class="flex flex-1 justify-center">
          <div class="layout-content-container flex flex-col max-w-full flex-1">
            <div class="@container">
              <div
                class="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 items-center justify-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDUiRYgncOCljMuuWvlFGryOxj1KsrdQaydoeamK_2RwNVPlgJvy_b6qVBO0Pcb11HXYFpNKTPZtOgk2ShPyPKqwx5Kpqc_ehBXxYVtYMeLia-dyLY8RWpkQkMWTkSbuYPY1NKzh9fVk6czVAtd9BIo30RKf4jcIyPnRT8jeVFEulukCbJ3OhuVyfZOTfAAYJh640B-R5pth_fTbkd8KzQJaVm13RSRfODnz-aB4RVjCY1zMUhlwP6BQBFaIowKPjXpp58FA8Os9xc")`,
                }}
              >
                <div class="flex flex-col gap-2 text-center">
                  <h1 class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-8xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Batik Nusantara
                  </h1>
                  <h2 class="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    Jelajahi keindahan dan kekayaan batik Indonesia. Temukan
                    sejarah, jenis, motif, dan teknik pembuatan batik yang
                    memukau.
                  </h2>
                </div>
                <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f2800d] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                  <span class="truncate">Pelajari Lebih Lanjut</span>
                </button>
              </div>
            </div>
            <div className="px-40 py-10">
            <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Tentang Batik Nusantara
            </h2>
            <p class="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">
              Batik Nusantara adalah wadah informasi yang didedikasikan untuk
              melestarikan dan mempromosikan warisan budaya batik Indonesia.
              Kami menyajikan informasi mendalam tentang sejarah batik, berbagai
              jenisnya, makna di balik setiap motif, serta teknik pembuatan yang
              rumit. Tujuan kami adalah untuk meningkatkan apresiasi terhadap
              batik sebagai seni dan simbol identitas bangsa.
            </p>
            <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Motif Batik dan Maknanya
            </h2>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div class="flex flex-col gap-3 pb-3">
                <div
                  class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDS0ZwGVHVz2oGqF6VNjEwzqNCJYgBZF8dPS_0jAUR6LIpCbDkq1elmLeEGf7Ek_BEE9TiOiqkoNVl3AV8UV--8ILUxb3VnLF7waHKY_6uXlrGLUBV0xlAU2LjA3hIJpg9wgo03bSygr1RnBjYi3LeInRRkElH2c5cisQ3eT5m-s2GrRfy4UCogZJzU7rlpsMUuieAMZeaxWpsFVMNCvwe9ruz0ynCop5CgPGvVdExdV3yI5NrAypCx2POFFABYqjEEtqqXCJZhHaw`,
                  }}
                ></div>
                <div>
                  <p class="text-white text-base font-medium leading-normal">
                    Motif Parang
                  </p>
                  <p class="text-[#baab9c] text-sm font-normal leading-normal">
                    Melambangkan kekuatan dan kesinambungan
                  </p>
                </div>
              </div>
              <div class="flex flex-col gap-3 pb-3">
                <div
                  class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDvLq-cC1QPOKABwVPZlgXewT2SxKqDZaSYixB-VskElpGkKAo9hNhof8J1dukNYiuReFlkSPUGZuhXNyhe9tMbpH3EOFOcyeZqGmaarMYMN4au8u5qfGUoqpJCK-8Vn5NbDkt_Agingvx54_pm35-HXn8L4QmH6EHXJGC29xNkn2E_YH46vNtUfMYRRwjE0vKYNN2agGPRDgJ9aWbYDe5LIcL8vwnfUV8X_cGpX_IQ97fVaIfeJwNn_c1qqcXrultd_IXbh9RNAKM`,
                  }}
                ></div>
                <div>
                  <p class="text-white text-base font-medium leading-normal">
                    Motif Kawung
                  </p>
                  <p class="text-[#baab9c] text-sm font-normal leading-normal">
                    Simbol kesucian dan keharmonisan
                  </p>
                </div>
              </div>
              <div class="flex flex-col gap-3 pb-3">
                <div
                  class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDB8Zbs4n_5n17aF8ghSXZKAuiMBgikE-AYV0RunOsKzu8n1SbWevgcHlX61HjnykOKsGgaObgZQrLR3GtaH4e8f42ylxcDrUaSdBRZXAPUnnlrzFBUIWVEyQm0LcdMSPkDPZ0PIEma2Q25TkzB0Gh8miWlN9a9FhdrDwTZHx7lSzqqIMxQzO2nCK0sD7jbn5Z2g-EwTaJL80htPLc-MAkbDLB6aOtSaH_iiMqV8nKTrHe_y49Oom95p2JENB9-8gbg_sp2j2f7epI`,
                  }}
                ></div>
                <div>
                  <p class="text-white text-base font-medium leading-normal">
                    Motif Truntum
                  </p>
                  <p class="text-[#baab9c] text-sm font-normal leading-normal">
                    Menggambarkan cinta kasih yang bersemi
                  </p>
                </div>
              </div>
            </div>
            <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Blog
            </h2>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div class="flex flex-col gap-3 pb-3">
                <div
                  class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDbzs3gy4iyXHGdDySpD_XIzFZSuBDMk_EtRgZQaIkrbozNfFlEIj75j1ZHavvWwrgnGT1wwbhrAB_6RyRSTb1g7EkTNViJ6Kh5menQi_qEQXquwCoJhVmrnZBe1on9nZeINDyQtuySVNW_ErTc_ilpXQe0ftaAPUKOx-BtdxkGDLOx9PudEnxAXOVLw_2SjnZkIoSqu2i5Korv2pAuIF-ksn8YL6nVzXYGe7yJy4ujnug72y5zjgWvOXG07oFY9JjF-P2audGRByY`,
                  }}
                ></div>
                <div>
                  <p class="text-white text-base font-medium leading-normal">
                    Sejarah Mendalam Batik
                  </p>
                  <p class="text-[#baab9c] text-sm font-normal leading-normal">
                    Pelajari asal-usul dan evolusi batik dari masa ke masa.
                  </p>
                </div>
              </div>
              <div class="flex flex-col gap-3 pb-3">
                <div
                  class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAzu3j7f4jEro9BWvrifEJE4Ru_Fje-DEbHC-hneGZsVq_yEJF1UJPsmwXr_4Opb9zahOHGgDVtwLyaiCvYkSJv1nd4KxI5JTQKdsRz17Ox60N2MDzaxvuGrdFPROTjkRtpFSK0kN-eQxyzlR3QBFyMOmhaYBdWuw-E-QjmsK4r9u4fKN2SUAw63rGyIef1sno8Gz8OQTYeXFZWdnHM0bEnG2ftCQZBvF_wOquINF-HKreRBDNiJDkkgrkwdw9vhztgNHOOnBmoXXc`,
                  }}
                ></div>
                <div>
                  <p class="text-white text-base font-medium leading-normal">
                    Eksplorasi Jenis dan Motif Batik
                  </p>
                  <p class="text-[#baab9c] text-sm font-normal leading-normal">
                    Temukan keanekaragaman batik dari berbagai daerah di
                    Indonesia.
                  </p>
                </div>
              </div>
              <div class="flex flex-col gap-3 pb-3">
                <div
                  class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAEmWlijBRUwsO1Ek7-F0NU1Tj5h6Cerluy2eiPlI9Y7vb8HonVemxyvOwxPsBtum5ImWI8t1Pm0lHtNa2Kys76ZJneOAjAoClhGUYKIh1ieglcXVmrrBIuJDjjwalbRWcq93iOomSnWdZPrvEiDHu81Lbxsh_995A8xUg2LMd1HzCHyzpz9i8n1oI0CGI_1WyI5bloLyDQjwqlOY1c5B3aipvDLGZmda87kJcsvVpgkLRERgcgPP_LilkVHFqoZz23aXJu6g-S3yA`,
                  }}
                ></div>
                <div>
                  <p class="text-white text-base font-medium leading-normal">
                    Wawancara dengan Pengrajin Batik
                  </p>
                  <p class="text-[#baab9c] text-sm font-normal leading-normal">
                    Dengarkan cerita inspiratif dari para pengrajin batik.
                  </p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div class="flex flex-col gap-3 pb-3">
                <div
                  class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvjgY6Iw4HoD4rVPe2MP7BaTlbe2M_Mx-cQzuTMcM3hFdLftxdLYx-7vxH9hyqKt-jYNQ0OjBSyDe-yFW-2_kQv3simqkHPoo4VsyOEA33XIc8qbOXM-_OIrhL-oG5rmqw5OqYni3MoYVkuv-0tt6KKdmmdvVh1PoTcsR2euyacUBV0lU0_SiynXnpdAL52UAn917FENAy0qMxujYyprrc_s--HjstOoIBW1wxTw9dzqRvOWNYHUUv34x1bl0BIEuiZHUPlFaEvqk`,
                  }}
                ></div>
                <div>
                  <p class="text-white text-base font-medium leading-normal">
                    Tren Mode Batik
                  </p>
                  <p class="text-[#baab9c] text-sm font-normal leading-normal">
                    Lihat bagaimana batik beradaptasi dengan tren mode modern.
                  </p>
                </div>
              </div>
              <div class="flex flex-col gap-3 pb-3">
                <div
                  class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB7IYyUEJG-j-RAFeMOPEcy3tG6oEZ97FKBjEZj4h30VYp7zTvsNllP4f1jo29Zm2TqhdJeRid3JtAtqfSow9k7z2d3Ic_ww14YqtawQHPo8S12WZQSn1iVmu7K042aCTjORO8H5pfZJmpMEiiZAFBl8PDrnMcgWNPJxJ7LDPXn_b0j2nY-jjL_2yNz6VkX1heYkq2MT5zgMTM6Pu_zzJebuvMS2dY1DobbmpAdhz0-5DzaVzMb16UHkYFLkANtkA4_2avnFK0sd9g`,
                  }}
                ></div>
                <div>
                  <p class="text-white text-base font-medium leading-normal">
                    Tips Perawatan Batik
                  </p>
                  <p class="text-[#baab9c] text-sm font-normal leading-normal">
                    Panduan praktis untuk menjaga keindahan dan kualitas batik
                    Anda.
                  </p>
                </div>
              </div>
            </div>
            <h2 class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Kontak Kami
            </h2>
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <p class="text-white text-base font-medium leading-normal pb-2">
                  Nama
                </p>
                <input
                  placeholder="Masukkan nama Anda"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#393028] focus:border-none h-14 placeholder:text-[#baab9c] p-4 text-base font-normal leading-normal"
                  value=""
                />
              </label>
            </div>
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <p class="text-white text-base font-medium leading-normal pb-2">
                  Email
                </p>
                <input
                  placeholder="Masukkan email Anda"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#393028] focus:border-none h-14 placeholder:text-[#baab9c] p-4 text-base font-normal leading-normal"
                  value=""
                />
              </label>
            </div>
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <p class="text-white text-base font-medium leading-normal pb-2">
                  Pesan
                </p>
                <textarea
                  placeholder="Tulis pesan Anda"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#393028] focus:border-none min-h-36 placeholder:text-[#baab9c] p-4 text-base font-normal leading-normal"
                ></textarea>
              </label>
            </div>
            <div class="flex px-4 py-3 justify-end">
              <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f2800d] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em]">
                <span class="truncate">Kirim</span>
              </button>
            </div>
            </div>
          </div>
        </div>

        <footer class="flex justify-center">
          <div class="flex max-w-[960px] flex-1 flex-col">
            <footer class="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div class="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a
                  class="text-[#baab9c] text-base font-normal leading-normal min-w-40"
                  href="#"
                >
                  Kebijakan Privasi
                </a>
                <a
                  class="text-[#baab9c] text-base font-normal leading-normal min-w-40"
                  href="#"
                >
                  Syarat dan Ketentuan
                </a>
                <a
                  class="text-[#baab9c] text-base font-normal leading-normal min-w-40"
                  href="#"
                >
                  Hubungi Kami
                </a>
              </div>
              <div class="flex flex-wrap justify-center gap-4">
                <a href="#">
                  <div
                    class="text-[#baab9c]"
                    data-icon="InstagramLogo"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                    </svg>
                  </div>
                </a>
                <a href="#">
                  <div
                    class="text-[#baab9c]"
                    data-icon="TwitterLogo"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                    </svg>
                  </div>
                </a>
                <a href="#">
                  <div
                    class="text-[#baab9c]"
                    data-icon="FacebookLogo"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                    </svg>
                  </div>
                </a>
              </div>
              <p class="text-[#baab9c] text-base font-normal leading-normal">
                @2024 Batik Nusantara. All rights reserved.
              </p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
