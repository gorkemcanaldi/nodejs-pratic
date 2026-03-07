export const notPageHandler = (req, res) => {
  res.status(404).send({
    durum: 404,
    message: 'sayfa bulunamadı',
  });
};
