using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;

namespace ECommerce.Service.Services
{
    public interface IFileManagerService
    {
        Task<string> UploadProductImage(IFormFile file);
    }
    public class FileManagerService : IFileManagerService
    {
        private readonly string _uploadDocumentFilePath;
        private IHostingEnvironment _environment;

        public FileManagerService(IHostingEnvironment environment)
        {
            _environment = environment;
            _uploadDocumentFilePath = $"{_environment.ContentRootPath}UploadFiles";
        }

        public async Task<string> UploadProductImage(IFormFile file)
        {
            string directoryPath = $"{_uploadDocumentFilePath}/ProductImages";
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            string fileName = Guid.NewGuid().ToString()+Path.GetExtension(file.FileName);
            string filePath = $"{directoryPath}/{fileName}";

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }
    }
}
