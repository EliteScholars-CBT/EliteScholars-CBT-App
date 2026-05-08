export default function handler(req, res) {
  return res.status(200).json({
    stage: "backend_hash_check",
    hash: "you88c85478aff3f3e6e94090b7b162b9331fa7ebbab84eb7f8d8824898cf60c612"
  });
}