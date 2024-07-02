import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Movie } from "../../types/Movie";
import constant from "../../axios";
import { Category } from "../../types/Category";
import { Country } from "../../types/Country";
import Select from "react-select";

interface MovieFormProps {
  onMovie: (movieData: Movie) => Promise<void>;
}

const MovieForm: React.FC<MovieFormProps> = ({ onMovie }) => {
  const { id } = useParams<{ id?: string | undefined }>();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Movie>();
  const [backendError, setBackendError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await constant.get("/category");
        if (Array.isArray(data.movie)) {
          setCategories(data.movie);
        } else {
          console.error(
            "API returned unexpected categories data format:",
            data
          );
        }
      } catch (error) {
        console.log("Lỗi khi lấy danh mục:", error);
      }
    };
    const fetchCountries = async () => {
      try {
        const { data } = await constant.get("/country");
        if (Array.isArray(data.country)) {
          setCountries(data.country);
        } else {
          console.error("API returned unexpected countries data format:", data);
        }
      } catch (error) {
        console.log("Lỗi khi lấy quốc gia:", error);
      }
    };

    fetchCategories();
    fetchCountries();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        try {
          const { data } = await constant.get(`/movie/${id}`);
          reset(data.data);
          if (data.data.category) {
            setSelectedCategories(
              data.data.category.map((cat: any) => cat._id)
            );
          }
          if (data.data.country) {
            setSelectedCountries(
              data.data.country.map((ctry: any) => ctry._id)
            );
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchMovie();
    }
  }, [id, reset]);

  const onSubmit: SubmitHandler<Movie> = async (data) => {
    try {
      const { _id, ...restData } = data;
      const categoriesToSubmit = selectedCategories.map(
        (categoryId) => categoryId
      );
      const countriesToSubmit = selectedCountries.map((countryId) => countryId); // Giữ nguyên ObjectId
      await onMovie({
        ...restData,
        _id: id,
        category: categoriesToSubmit,
        country: countriesToSubmit,
      });
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setBackendError(message);
        if (error.response.data.errors) {
          error.response.data.errors.forEach((err: any) => {
            setError(err.path, { message: err.message });
          });
        }
      }
    }
  };

  const handleCategoryChange = (selectedOptions: any) => {
    const categoryIds = selectedOptions.map((option: any) => option.value);
    setSelectedCategories(categoryIds);
  };

  const handleCountryChange = (selectedOptions: any) => {
    const countryIds = selectedOptions.map((option: any) => option.value);
    setSelectedCountries(countryIds);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{id ? "Chỉnh sửa Phim" : "Thêm Phim Mới"}</h1>
      {backendError && <p className="text-danger">{backendError}</p>}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Tên Phim
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          {...register("name")}
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="slug" className="form-label">
          Slug
        </label>
        <input
          type="text"
          className="form-control"
          id="slug"
          {...register("slug")}
        />
        {errors.slug && <p className="text-danger">{errors.slug.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="origin_name" className="form-label">
          Tên Gốc
        </label>
        <input
          type="text"
          className="form-control"
          id="origin_name"
          {...register("origin_name")}
        />
        {errors.origin_name && (
          <p className="text-danger">{errors.origin_name.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Thể loại
        </label>
        <input
          type="text"
          className="form-control"
          id="type"
          {...register("type")}
        />
        {errors.type && <p className="text-danger">{errors.type.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="poster_url" className="form-label">
          Đường dẫn ảnh bìa
        </label>
        <input
          type="text"
          className="form-control"
          id="poster_url"
          {...register("poster_url")}
        />
        {errors.poster_url && (
          <p className="text-danger">{errors.poster_url.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="thumb_url" className="form-label">
          Đường dẫn ảnh nhỏ
        </label>
        <input
          type="text"
          className="form-control"
          id="thumb_url"
          {...register("thumb_url")}
        />
        {errors.thumb_url && (
          <p className="text-danger">{errors.thumb_url.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="sub_docquyen" className="form-label">
          Dịch vụ Độc Quyền
        </label>
        <input
          type="checkbox"
          className="form-check-input"
          id="sub_docquyen"
          {...register("sub_docquyen")}
        />
        {errors.sub_docquyen && (
          <p className="text-danger">{errors.sub_docquyen.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="chieurap" className="form-label">
          Chiếu Rạp
        </label>
        <input
          type="checkbox"
          className="form-check-input"
          id="chieurap"
          {...register("chieurap")}
        />
        {errors.chieurap && (
          <p className="text-danger">{errors.chieurap.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="time" className="form-label">
          Thời lượng
        </label>
        <input
          type="text"
          className="form-control"
          id="time"
          {...register("time")}
        />
        {errors.time && <p className="text-danger">{errors.time.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="episode_current" className="form-label">
          Số Tập Hiện Tại
        </label>
        <input
          type="text"
          className="form-control"
          id="episode_current"
          {...register("episode_current")}
        />
        {errors.episode_current && (
          <p className="text-danger">{errors.episode_current.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="quality" className="form-label">
          Chất Lượng
        </label>
        <input
          type="text"
          className="form-control"
          id="quality"
          {...register("quality")}
        />
        {errors.quality && (
          <p className="text-danger">{errors.quality.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="lang" className="form-label">
          Ngôn Ngữ
        </label>
        <input
          type="text"
          className="form-control"
          id="lang"
          {...register("lang")}
        />
        {errors.lang && <p className="text-danger">{errors.lang.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="year" className="form-label">
          Năm
        </label>
        <input
          type="number"
          className="form-control"
          id="year"
          {...register("year")}
        />
        {errors.year && <p className="text-danger">{errors.year.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Thể loại
        </label>
        <Select
          id="category"
          options={categories.map((category) => ({
            value: category._id,
            label: category.name,
          }))}
          onChange={handleCategoryChange}
          isMulti
        />
        {errors.category && (
          <p className="text-danger">Vui lòng chọn ít nhất một thể loại.</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="country" className="form-label">
          Quốc gia
        </label>
        <Select
          id="country"
          options={countries.map((country) => ({
            value: country._id,
            label: country.name,
          }))}
          onChange={handleCountryChange}
          isMulti
        />
        {errors.country && (
          <p className="text-danger">Vui lòng chọn ít nhất một quốc gia.</p>
        )}
      </div>

      <div className="mb-3">
        <button className="btn btn-primary w-100" type="submit">
          {id ? "Chỉnh sửa Phim" : "Thêm Phim Mới"}
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
